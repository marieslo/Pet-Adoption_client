import React, { useEffect, useState } from 'react';
import './MyPetsPage.css';
import { useMyPetsContext } from '../../context/MyPetsProvider';
import PetsList from './PetsList';
import AdoptablePetsFeed from '../../components/AdoptablePetsFeed/AdoptablePetsFeed';

export default function MyPetsPage() {
  const {
    likedPets = [], 
    adoptedPets = [],
    fosteredPets = [], 
    likePet,
    unlikePet,
    adoptPet,
    fosterPet,
    unlikedPetsUpdated,
    adoptedPetsUpdated,
    fosteredPetsUpdated,
  } = useMyPetsContext();

  const [likedPetsUpdated, setLikedPetsUpdated] = useState(false);
  const [adoptedPetsUpdated, setAdoptedPetsUpdated] = useState(false);
  const [fosteredPetsUpdated, setFosteredPetsUpdated] = useState(false);

  useEffect(() => {
    setLikedPetsUpdated(unlikedPetsUpdated);
  }, [unlikedPetsUpdated]);

  useEffect(() => {
    setAdoptedPetsUpdated(adoptedPetsUpdated);
  }, [adoptedPetsUpdated]);

  useEffect(() => {
    setFosteredPetsUpdated(fosteredPetsUpdated);
  }, [fosteredPetsUpdated]);

  const handleUnlikePet = async (petId) => {
    try {
      await unlikePet(petId);
    } catch (error) {
      console.error('Error unliking pet:', error);
    }
  };

  return (
    <div className='my-pets-page-container'>
      <div className='my-pets-lists-wrapper'>
        <PetsList
         key={likedPetsUpdated ? 'likedUpdated' : 'liked'}
         title='Liked'
         cssClass='liked'
         pets={likedPets}
         onLike={likePet}
         onUnlike={handleUnlikePet} 
        />
        <PetsList
          key={fosteredPetsUpdated ? 'fosteredUpdated' : 'fostered'}
          title='Fostered'
          cssClass='fostered'
          pets={fosteredPets}
          onLike={likePet}
          onAdopt={adoptPet} // Change to onAdopt for fostering
        />
        <PetsList
          key={adoptedPetsUpdated ? 'adoptedUpdated' : 'adopted'}
          title='Adopted'
          cssClass='adopted'
          pets={adoptedPets}
          onLike={likePet}
          onUnlike={unlikePet}
        />

        {!(likedPetsUpdated || adoptedPetsUpdated || fosteredPetsUpdated) && (
          <div className='they-need-your-love'>
            <p>
              For now, you don't have any saved, adopted, or fostered pets.
            </p>
            <div className='mypets-page-petsfeed-container'>
              Look for adoptable ones
              <AdoptablePetsFeed />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
