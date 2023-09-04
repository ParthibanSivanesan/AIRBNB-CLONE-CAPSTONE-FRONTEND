import React from 'react';
import { useState } from 'react';
import Images from './Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faStar, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import axiosConnect from '../../Token/axios';


function ImagesUploader({ addedPhotos, setAddedPhotos }) {

    const [photoLink, setPhotoLink] = useState('');

    async function addImagebyLink(e) {
        e.preventDefault();
        const { data: filename } = await axiosConnect.post('/upload-by-link', {
            link: photoLink,
        });
        setAddedPhotos(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }


    async function uploadImage(e) {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        const { data: filenames } = await axiosConnect.post('/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' },
        });
        setAddedPhotos((prev) => {
            return [...prev, ...filenames];
        });

    }


    function removeImage(e, filename) {
        e.preventDefault();
        setAddedPhotos([...addedPhotos.filter(photo => photo !== filename)]);
    }


    function setasMainImage(e, filename) {
        e.preventDefault();
        setAddedPhotos([filename, ...addedPhotos.filter(photo => photo !== filename)]);
    }


    return (
        <div>
            <span className="inp-plus-btn">
                <input type="text" className="form-control inp-bar" placeholder="Upload the Image link here..." value={photoLink} onChange={(e) => setPhotoLink(e.target.value)} />
                <button className="btn-photo-inp" onClick={addImagebyLink}>Add photo</button>
            </span>

            <div className="gallery-img">
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className="box-img container-img" key={link}>
                        <Images className="image-img" style={{ width: "250px", height: "150px", borderRadius: "10px" }} src={link} alt="" />
                        <div className="parent">
                            <button className=" btn-delte-img" onClick={(e) => removeImage(e, link)}>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>

                            <button className="btn-star-img" onClick={(e) => setasMainImage(e, link)}>
                                {link === addedPhotos[0] && (
                                    <FontAwesomeIcon icon={faStar} />
                                )}
                                {link !== addedPhotos[0] && (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></svg>
                                )}

                            </button>
                        </div>

                    </div>
                ))}
                <label className="btn-photo upload-btn">
                    <input type="file" multiple className="visually-hidden cursor-ptr" onChange={uploadImage} />
                    <FontAwesomeIcon icon={faArrowUpFromBracket} />&nbsp; Upload
                </label>
            </div>
        </div>
    );
}

export default ImagesUploader;