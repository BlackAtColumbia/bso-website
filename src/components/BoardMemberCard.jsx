import React from 'react';
import '../styles/BoardMemberCard.css';

const BoardMemberCard = ({ name, role, image, bio }) => {
    return (
        <div className="board-card">
            <div className="board-card-image">
                {image ? (
                    <img src={image} alt={name} />
                ) : (
                    <div className="placeholder-image">{name.charAt(0)}</div>
                )}
            </div>
            <div className="board-card-content">
                <h3 className="board-name">{name}</h3>
                <p className="board-role">{role}</p>
                {bio && <p className="board-bio">{bio}</p>}
            </div>
        </div>
    );
};

export default BoardMemberCard;
