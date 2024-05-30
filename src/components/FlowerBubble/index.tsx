import React from 'react';
import "./styles.css";
import { useDispatch, useSelector } from 'react-redux';
import { geUsersBubbles } from '../../redux/bubblesImage';
import { sendData } from '../../redux/assistant';
import AVATAR from '../../assets/img/icons/avatar.svg';
import COFFEE from '../../assets/img/icons/Coffe.svg';
import { any } from 'prop-types';

const FlowerBubble = () => {
    const users = useSelector(geUsersBubbles);
    const dispatch = useDispatch();

    const handleClickButton = (id: string) => {
        dispatch(
            sendData({
                action_id: 'SelectedUser',
                parameters: { id: id }
            })
        );
    };


      
    // users.slice(0, 8).forEach((item, index) => {
    //     fetch(item.avatar, {
    //         mode: 'cors',
    //         method: 'GET',
            
    //         headers: { 'Content-Type': 'application/json' }
    //     })
    //         .then(response => {
    //             if (response.ok !== true) {
                    
    //                 let responses = response;
    //                 console.log(responses);
    //                 console.log("response.ok !== true")
    //                 dispatch(
    //                     sendData({
    //                         action_id: 'avatarLog',
    //                         parameters: { responseOkNotrue: responses }
    //                     })
    //                 );
    //             }
    //             else {
    //                 dispatch(
    //                     sendData({
    //                         action_id: 'avatarLog',
    //                         parameters: { avatarLogOk: response.json(), error: "Image loaded successfully" }
    //                     })
    //                 );

    //                 console.log(response.json())
    //                 console.log(item.avatar, " - Image loaded successfully")
    //             }
    //         })
    //         .catch(error => {
    //             console.log("error catch")
    //             let testError = error.message;
    //             console.log(testError)
           
    //             dispatch(
    //                 sendData({
    //                     action_id: 'avatarLog',
    //                     parameters: testError 
    //                 })
    //             )
    //         }
    //         )
    // })

    return (
        <div className="container">
            <div className="path">
                <div className="imgCenter">
                    <img src={COFFEE} className="avatar2" alt="description of image" />
                </div>
                {
                    users.slice(0, 10).map((item, index) => (
                        <div className="avatarContainer" key={index} onClick={() => { handleClickButton(item.id) }}>
                            <img src={item.avatar ? item.avatar : AVATAR} className="avatar" alt="description of image2" />
                        </div>
                    ))
                }

            </div>
        </div>
    );
};

export default FlowerBubble;


