import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; 
import { addDoc, collection } from 'firebase/firestore'; 
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { storage, db } = useContext(FirebaseContext); 
  const { user } = useContext(AuthContext); 
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); 
  const navigate = useNavigate()



  const handleSubmit = () => {
    if (!image) {
      console.log("No image selected");
      return;
    }

    
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log('Error uploading file:', error);
      },
      () => {
        
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log('File available at', url);

          
          addDoc(collection(db, 'products'), {
            name: name,
            category: category,
            price: price,
            imageUrl: url,
            userId: user ? user.uid : 'anonymous', 
            createdAt: new Date() 
          })
          .then(() => {
            console.log('Product added to Firestore successfully');
            navigate('/')
          })
          .catch((error) => {
            console.error('Error adding product to Firestore:', error);
          });
        });
      }
    );
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            id="fname"
            onChange={(e) => setName(e.target.value)}
            name="Name"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="fname"
            name="category"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            name="Price"
          />
          <br />
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ''}
          ></img>
          <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            Upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
