import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';
import axios from 'axios';
import supabase from './supabaseClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_PATH = path.join(__dirname, process.env.CSV_PATH);
const BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME || 'public';
const TABLE_NAME = process.env.SUPABASE_TABLE_NAME || 'board_members';

// Helper to normalize year  should return '26' or '27' or '28' or '29'
function normalizeYear(yearStr) {
    if (!yearStr) return null;
    const lower = yearStr.toString().toLowerCase().trim();

    // Handle text
    if (lower.includes('freshman')) return '29';
    if (lower.includes('sophomore')) return '28';
    if (lower.includes('junior')) return '27';
    if (lower.includes('senior')) return '26';

    // Handle numbers
    const match = lower.match(/(\d+)/);
    if (match) {
        let num = parseInt(match[1]);
        if (num >= 2000) num = num - 2000;
        return num.toString();
    }
    return yearStr;
}

// Helper to normalize school
function normalizeSchool(schoolStr) {
    if (!schoolStr) return null;
    const lower = schoolStr.toLowerCase().trim();
    if (lower.includes('columbia college') || lower === 'cc') return 'CC';
    if (lower.includes('seas') || lower.includes('engineering')) return 'SEAS';
    if (lower.includes('general studies') || lower === 'gs') return 'GS';
    if (lower.includes('barnard')) return 'Barnard';
    return schoolStr;
}

async function processRow(row) {
    const name = row['Name'];
    const role = row['Role'];
    const rawInfo = row['Major, School, Year'];
    const headshotUrl = row['Headshot'];

    if (!name) return;

    console.log(`Processing ${name}...`);

    // Parse Major, School, Year
    const parts = rawInfo ? rawInfo.split(',').map(s => s.trim()) : [];

    let year = null;
    let school = null;
    let major = null;

    if (parts.length >= 3) {
        year = normalizeYear(parts[parts.length - 1]);
        school = normalizeSchool(parts[parts.length - 2]);
        major = parts.slice(0, parts.length - 2).join(', ');
    } else {
        console.warn(`Warning: Could not parse info for ${name}: "${rawInfo}"`);
        major = rawInfo;
    }

    // Upload Headshot
    let finalHeadshotUrl = null;
    if (headshotUrl) {
        try {
            const response = await axios.get(headshotUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data, 'binary');
            // Extract extension from URL (ignoring query params) or default to jpg
            const urlPath = headshotUrl.split('?')[0];
            const ext = path.extname(urlPath) || '.jpg';
            const filename = `headshots/${name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}${ext}`;

            const { error: uploadError } = await supabase
                .storage
                .from(BUCKET_NAME)
                .upload(filename, buffer, {
                    contentType: response.headers['content-type'],
                    upsert: true
                });

            if (uploadError) {
                console.error(`Failed to upload headshot for ${name}:`, uploadError.message);
            } else {
                const { data: publicUrlData } = supabase
                    .storage
                    .from(BUCKET_NAME)
                    .getPublicUrl(filename);
                finalHeadshotUrl = publicUrlData.publicUrl;
            }
        } catch (err) {
            console.error(`Failed to download/upload headshot for ${name}:`, err.message);
        }
    }

    // Upsert into Table
    const { error: insertError } = await supabase
        .from(TABLE_NAME)
        .upsert({
            name,
            role,
            major,
            school,
            year,
            headshot_url: finalHeadshotUrl
        }, { onConflict: 'name' });

    if (insertError) {
        console.error(`Failed to insert ${name}:`, insertError.message);
    } else {
        console.log(`Successfully processed ${name}`);
    }
}

async function main() {
    const rows = [];
    fs.createReadStream(CSV_PATH)
        .pipe(csv())
        .on('data', (data) => rows.push(data))
        .on('end', async () => {
            console.log(`Found ${rows.length} rows.`);
            for (const row of rows) {
                await processRow(row);
            }
            console.log('Done.');
        });
}

main();
