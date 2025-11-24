import React, { useEffect, useState } from 'react';
import BoardMemberCard from '../components/BoardMemberCard';
import { supabase } from '../lib/supabaseClient';
import '../styles/Board.css';

const Board = () => {
    const [boardMembers, setBoardMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBoardMembers = async () => {
            try {
                const { data, error } = await supabase
                    .from('board_members')
                    .select('*');

                if (error) throw error;

                // Transform data to match BoardMemberCard props
                const formattedMembers = data.map(member => ({
                    id: member.id,
                    name: member.name,
                    role: member.role,
                    image: member.headshot_url,
                    // Construct bio from major, school, year
                    bio: [member.major, member.school, member.year].filter(Boolean).join(', ')
                }));

                // Custom sort order
                const roleOrder = [
                    'President', // Matches "Co-President"
                    'Vice President',
                    'Secretary',
                    'Historian',
                    'Treasurer',
                    'Sociocultural Chair', // Matches "Co-Sociocultural Chair"
                    'Publicity Chair', // Matches "Social Media Chair"
                    'Senior Chair', // Matches "Senior Rep"
                    'Barnard Liason', // Matches "Barnard Liaison"
                    'Political Chair', // Matches "Pol/Ed Chair"
                    'Alumni Relations Chair', // Matches "Alumni Outreach"
                    'Campus Liason',
                    'GS Liason',
                    'Community Outreach Chair', // Matches "Community Outreach Specialist"
                    'Freshman Representitves' // Matches "Freshman Representative"
                ];

                const getRoleRank = (role) => {
                    if (!role) return 100;
                    const normalizedRole = role.toLowerCase();

                    // Map actual DB roles to the requested order
                    if (normalizedRole.includes('president') && !normalizedRole.includes('vice')) return 0;
                    if (normalizedRole.includes('vice president')) return 1;
                    if (normalizedRole.includes('secretary')) return 2;
                    if (normalizedRole.includes('historian')) return 3;
                    if (normalizedRole.includes('treasurer')) return 4;
                    if (normalizedRole.includes('sociocultural')) return 5;
                    if (normalizedRole.includes('publicity') || normalizedRole.includes('social media')) return 6;
                    if (normalizedRole.includes('senior')) return 7;
                    if (normalizedRole.includes('barnard')) return 8;
                    if (normalizedRole.includes('political') || normalizedRole.includes('pol/ed')) return 9;
                    if (normalizedRole.includes('alumni')) return 10;
                    if (normalizedRole.includes('campus')) return 11;
                    if (normalizedRole.includes('gs') && normalizedRole.includes('liason')) return 12;
                    if (normalizedRole.includes('community outreach')) return 13;
                    if (normalizedRole.includes('freshman')) return 14;

                    return 99; // Others at the end
                };

                formattedMembers.sort((a, b) => {
                    const rankA = getRoleRank(a.role);
                    const rankB = getRoleRank(b.role);
                    return rankA - rankB;
                });

                setBoardMembers(formattedMembers);
            } catch (error) {
                console.error('Error fetching board members:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBoardMembers();
    }, []);

    return (
        <div className="board-page">
            <header className="board-header">
                <div className="container text-center">
                    <h1 className="section-title">2025-2026 Executive Board</h1>
                    <p className="board-intro">
                        Meet the dedicated leaders working to serve the Black community at Columbia University.
                    </p>
                </div>
            </header>

            <section className="container board-grid-section">
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <div className="board-grid">
                        {boardMembers.map(member => (
                            <BoardMemberCard
                                key={member.id}
                                name={member.name}
                                role={member.role}
                                image={member.image}
                                bio={member.bio}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Board;
