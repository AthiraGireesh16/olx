import React, { useEffect, useState, useContext } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { Timestamp } from 'firebase/firestore'; 

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
  const { db } = useContext(FirebaseContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (postDetails && postDetails.userId) {
        const userId = postDetails.userId;
        console.log("Fetching user details for userId:", userId); 
        const userSnapshot = await db.collection('users').where('id', '==', userId).get();

        if (!userSnapshot.empty) {
          userSnapshot.forEach((doc) => {
            setUserDetails(doc.data());
          });
        } else {
          console.log("No user found with ID:", userId); 
        }
      }
    };

    fetchUserDetails();
  }, [postDetails, db]); 

  
  const formatTimestamp = (timestamp) => {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate().toLocaleString(); 
    }
    return timestamp; 
  };

  
  console.log("Post Details:", postDetails);
  console.log("User Details:", userDetails);

  if (!postDetails) {
    return <div>Loading product details...</div>; 
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.imageUrl} alt={postDetails.name} /> 
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{formatTimestamp(postDetails.createdAt)}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username || "N/A"}</p>
          <p>{userDetails?.phone || "N/A"}</p>
        </div> }
      </div>
    </div>
  );
}

export default View;
