import React from 'react';
import Bcrypt from 'bcryptjs';

const saltRounds = 10;


async function hashPassword(password){
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function comparePassword (password, storedPassword){
    const isTheSame = await bcrypt.compare(password, storedPassword);
    return isTheSame;
}

function bcrypt () {
return 

}
module.exports =  { hashPassword, comparePassword }
 