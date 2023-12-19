import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './Card.scss';

const Card = ({ card, onUpdateCard, updateTasksCompleted }) => {
    const [isChecked, setIsChecked] = useState(card.checked);
  
    const handleCheckboxChange = () => {
      const updatedCard = { ...card, checked: !isChecked };
      setIsChecked(!isChecked);
      onUpdateCard(updatedCard);
      if (!isChecked) {
        updateTasksCompleted();
      }
    };

    return (
        <div className='list'>
            {card.image && 
                <img 
                    src={card.image} 
                    className='img_list'   
                    onMouseDown={event => event.preventDefault()}
                    alt='Imagem' 
                />
            }
            {card.title}
            <label className='checkbox-container'>
                <input 
                    type='checkbox' 
                    checked={isChecked} 
                    onChange={handleCheckboxChange} 
                />
                <span className='checkmark'>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
            </label>
        </div>
    );
};

export default Card;