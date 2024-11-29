'use client';

import React, { useState } from 'react';
import { registerAction } from '../serverActions/registerActions';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const registerHandler = async (e) => {
    e.preventDefault();
    const registerDetails = { username, email, password };
    console.log(registerDetails);
    await registerAction(registerDetails);
    router.push('/login');
  };

  return (
    <>
      <style jsx>{`
        .formContainer {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #ffafbd, #ffc3a0);
        }

        .formSection {
          background-color: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          width: 400px;
          text-align: center;
        }

        .formSection h3 {
          font-size: 18px;
          margin-bottom: 10px;
          color: #333;
          text-align: left;
        }

        .formSection input {
          width: 100%;
          padding: 10px;
          border: 2px solid black;
          border-radius: 8px;
          font-size: 14px;
          margin-bottom: 15px;
          outline: none;
        }

        .formSection input:focus {
          border-color: #ffafbd;
          box-shadow: 0 0 5px rgba(255, 175, 189, 0.5);
        }

        .formSection button {
          width: 100%;
          padding: 10px;
          background: #ffafbd;
          color: white;
          font-size: 16px;
          border: 2px solid black;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease-in-out;
        }

        .formSection button:hover {
          background: #ff8a9f;
        }
      `}</style>

      <div className="formContainer">
        <form className="formSection" onSubmit={registerHandler}>
          <h3>Username</h3>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />

          <h3>Email</h3>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3>Password</h3>
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
