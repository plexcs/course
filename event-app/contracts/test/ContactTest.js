const Contacts = artifacts.require("Contacts");


contract("Contacts", accounts => {
    it("should create a new contact", async () => {
        const instance = await Contacts.deployed();
        await instance.createContact("Adhrit the programmer", "3984058469");
        const count = await instance.count();
        assert.equal(count, 2, "The contact was not created!");  
    });
    // try to retrieve it from the id

    it("should return the contact by its id", async() => {
        const instance = await Contacts.deployed();
        await instance.createContact("programmer", "39840584696768");
        const contact = await instance.contacts(3);
        assert.equal(contact.name,"programmer","The name of the contact is incorrect");
        assert.equal(contact.phone, "39840584696768","The phone is incorrect");
        console.log(contact.name);
    });

    it("should delete a contact by its id", async () => {
        const instance = await Contacts.deployed();
        await instance.deleteContact(2);
        const contact = await instance.contacts(2);
        assert.equal(contact.id,0,"The contact was not deleted");
    });
});