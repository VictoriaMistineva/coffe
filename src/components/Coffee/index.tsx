import React, { useEffect, useState } from 'react';
import cupImg from './cup.png'
import "./coffee.css";
import { useDispatch, useSelector } from 'react-redux';
import { geUsersBubbles } from '../../redux/bubblesImage';
import { sendData } from '../../redux/assistant';
import AVATAR from '../../assets/img/icons/avatar.svg';


const Coffee = () => {
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



    useEffect(() => {

        const timeout = setTimeout(() => {
            const children = document.querySelectorAll('.circle-container > *');
            children.forEach((child) => {
                child.classList.add('stop-animation');
            });

            const circleContainer2 = document.querySelectorAll('.circle-container2 > *');
            circleContainer2.forEach((child) => {
                child.classList.add('stop-animation');
            });

            const container1Img = document.querySelectorAll('.container1 img');
            container1Img.forEach((child) => {
                child.classList.add('stop-animation');
            });

            const container1Img2 = document.querySelectorAll('.container2 img');
            container1Img2.forEach((child) => {
                child.classList.add('stop-animation');
            });

        }, 10000);
        return () => clearTimeout(timeout);

    }, []);



    // users.slice(0, 8).forEach((item, index) => {
    //     fetch(item.avatar ? item.avatar : AVATAR, {
    //         mode: 'no-cors',
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json' }
    //     })
    //         .then(response => {
    //             if (response.ok !== true) {
    //                 console.log(response);
    //             }
    //             else {
    //                 console.log(response)
    //                 console.log(item.avatar, " - Image loaded successfully")
    //             }
    //         })
    //         .catch(error => console.warn(error))

        // get a callback when the server responds
        //     let xhr : XMLHttpRequest = new XMLHttpRequest()
        //     xhr.addEventListener('load', () => {
        //       // update the state of the component with the result here
        //       console.log(xhr.responseText)
        //     })
        //     // open the request with the verb and the url
        //     xhr.open('GET', item.avatar)
        //     // send the request
        //     try {
        //         xhr.send()
        //     }
        //     catch (exception) {
        //         console.log(exception)
        //     }

        // })



        return (
            <div className="containerCoffee">
                <div className="container">
                    <div id="cup" style={{ backgroundImage: `url(${cupImg})` }}></div>
                    <div id="coffee"></div>
                </div>
                <ul className='circle-container'>
                    {
                        users.slice(0, 8).map((item, index) => (
                            <li key={index} className='container1'>
                                <div className='ct'>
                                    <img src={item.avatar ? item.avatar : AVATAR} className="avatar" alt="..."
                                        onClick={() => { handleClickButton(item.id) }
                                        }
                                    />
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <ul className='circle-container2'>
                    {
                        users.slice(8, 16).map((item, index) => (
                            <li key={index} className='container2' onClick={() => { handleClickButton(item.id) }}><div className='ct2'><img src={item.avatar ? item.avatar : AVATAR} className="avatar" alt="..." onClick={() => { handleClickButton(item.id) }} /></div></li>
                        ))
                    }
                </ul>
            </div>
        );
    };

    export default Coffee;
