import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import supabase from './supabaseClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME || 'public';
const FILE_PATH = path.join(__dirname, '../public/kwaanza-snipet.mp4');
const DESTINATION_PATH = 'videos/kwaanza-snipet.mp4';

async function uploadVideo() {
    console.log(`Reading file from ${FILE_PATH}...`);

    if (!fs.existsSync(FILE_PATH)) {
        console.error('File not found:', FILE_PATH);
        process.exit(1);
    }

    const fileBuffer = fs.readFileSync(FILE_PATH);

    console.log(`Uploading to bucket '${BUCKET_NAME}' as '${DESTINATION_PATH}'...`);

    const { data, error } = await supabase
        .storage
        .from(BUCKET_NAME)
        .upload(DESTINATION_PATH, fileBuffer, {
            contentType: 'video/mp4',
            upsert: true
        });

    if (error) {
        console.error('Upload failed:', error.message);
        process.exit(1);
    }

    console.log('Upload successful!', data);

    const { data: publicUrlData } = supabase
        .storage
        .from(BUCKET_NAME)
        .getPublicUrl(DESTINATION_PATH);

    console.log('Public URL:', publicUrlData.publicUrl);
}

uploadVideo();
