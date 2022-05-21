const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath));
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContacts = contacts.filter(({ id }) => id !== contactId);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log(`Contact with id=${contactId} was removed`);
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: require("nanoid").nanoid(), name, email, phone };
  const newContacts = [...contacts, newContact];
  try {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log(`Contact with name=${name} was added to database`);
  } catch (err) {
    console.log(err.message);
  }
}

const contactsOperations = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contactsOperations;
