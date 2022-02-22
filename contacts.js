const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
/*
first option
*/
//const contactsPath = path.join(__dirname, "./db/contacts.json");

/*
second option
*/
const contactsPath = path.resolve(__dirname, "./db/contacts.json");
const read = async (readFile, code = "utf-8") => await fs.readFile(readFile, code);

const  listContacts = async () => {
  try {
    const data = await read(contactsPath);

    console.table(JSON.parse(data));
  } catch (error) {
    console.error(error.message);
  }
}

const getContactById = async(contactId) => {
  try {
    const data = await read(contactsPath);
    const searchResult = JSON.parse(data).find(({ id }) => id === String(contactId));

    console.table(searchResult);
  } catch (error) {
    console.error(error.message);
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await read(contactsPath);
    const filteredList = JSON.parse(data).filter(({ id }) => id !== String(contactId));

    fs.writeFile(contactsPath, JSON.stringify(filteredList));
  } catch (error) {
    console.error(error.message);
  }
}

const addContact = async (userName, userEmail, userPhone) => {
  try {
    const contacts = await read(contactsPath);
    const isNotUniqueEmail = JSON.parse(contacts).some(({ email }) => email === userEmail);

    if (isNotUniqueEmail) {
      console.log("try again and enter correct data");
      return;
    }
    if (userName && userEmail && userPhone) {
      const newContact = { id: nanoid(), name: userName, email: userEmail, phone: userPhone };
      const allContactsAndAddedContact = [...JSON.parse(contacts), newContact];

      fs.writeFile(contactsPath, JSON.stringify(allContactsAndAddedContact));
      return;
    }

  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
