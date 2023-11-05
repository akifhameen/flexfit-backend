import bcrypt from 'bcryptjs';
import { User } from '../models/user.js'
import { ADMIN1_EMAIL, ADMIN1_FIRSTNAME, ADMIN1_LASTNAME, ADMIN2_EMAIL, ADMIN2_FIRSTNAME, ADMIN2_LASTNAME, ADMIN3_EMAIL, ADMIN3_FIRSTNAME, ADMIN3_LASTNAME, ADMIN4_EMAIL, ADMIN4_FIRSTNAME, ADMIN4_LASTNAME, ADMIN_PASSWORD } from '../utils/env.js';


export const userInit = async() => {
  let hashedPassword;
  const [ email1, email2, email3, email4 ] = [ADMIN1_EMAIL, ADMIN2_EMAIL, ADMIN3_EMAIL, ADMIN4_EMAIL]
  const adminsExist = await User.find({
    email: { $in: [email1, email2, email3, email4] },
    role: 'admin'
  });

  try {
    hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
  } catch (e) {
    console.log(e);
  } 

  if (adminsExist.length === 0) {
    const bulkData = [
      {firstName: ADMIN1_FIRSTNAME,lastName: ADMIN1_LASTNAME,email: email1,password: hashedPassword, role: 'admin'},
      {firstName: ADMIN2_FIRSTNAME,lastName: ADMIN2_LASTNAME,email: email2,password: hashedPassword, role: 'admin'},
      {firstName: ADMIN3_FIRSTNAME,lastName: ADMIN3_LASTNAME,email: email3,password: hashedPassword, role: 'admin'},
      {firstName: ADMIN4_FIRSTNAME,lastName: ADMIN4_LASTNAME,email: email4,password: hashedPassword, role: 'admin'}
    ];

    await User.insertMany(bulkData);
    console.log('userInit done!');
  }
};