import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AUTH_URL = "http://localhost:8000/login"

export default function Login() {
    return (
        <div>
            <a className="Login" href={AUTH_URL}>LOGIN</a>
        </div>
    )
}