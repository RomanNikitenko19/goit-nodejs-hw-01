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

const addContact = async (name, email, phone) => {
  try {
    const contacts = await read(contactsPath);
    console.log(Array.isArray(JSON.parse(contacts)));
    console.log(JSON.parse(contacts));
    const isNotUniqueEmail = JSON.parse(contacts).some((contact, index, array) => {
      console.log(contact.email);
      console.log(typeof contact.email);
      contact.email === email
    });

    console.log(isNotUniqueEmail);//false?????
    console.log(Boolean(isNotUniqueEmail));
    if (isNotUniqueEmail) {
      console.log("try again and enter correct data");
      return;
    }
    if (name && email && phone) {
      // const newContact = { id: nanoid(), name, email, phone };
      // const allContactsAndAddedContact = [...JSON.parse(contacts), newContact];

      // fs.writeFile(contactsPath, JSON.stringify(allContactsAndAddedContact));
      console.log('ok');
      return
    }
    console.log('no');
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
