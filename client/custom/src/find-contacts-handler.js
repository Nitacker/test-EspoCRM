define('custom:find-contacts-handler', ['action-handler'], (Dep) => {

    return class extends Dep {

        initFindContacts() {}

        findContacts(data, e) {
            console.log('Metoda findContacts byla zavolána');

            //načtení záznamu Lead
            Espo.Ajax.getRequest('Lead/' + this.view.model.id)
            .then(leadResponse => {
                const leadEmail = leadResponse.emailAddress;
                console.log('Email:', leadEmail);

                // načtení všech záznamů Contact
                return Espo.Ajax.getRequest('Contact').then(contactResponse => {

                    // vrácení leadEmail a response
                    return { leadEmail, contactResponse };  
                });
            })
            .then(({ leadEmail, contactResponse }) => {

                // kontrola
                if (contactResponse.list && contactResponse.list.length > 0) {
                    contactResponse.list.forEach(contact => {

                        // porovnání e-mailů
                        if (contact.emailAddress === leadEmail) {
                            console.log(`Jméno kontaktu: ${contact.firstName} ${contact.lastName}`);
                        }
                    });
                } else {
                    console.log('Žádné kontakty nebyly nalezeny.');
                }
            })
            .catch(error => {
                console.error('Chyba:', error);
            });
        }

        isFindContactsVisible() {
            return true; // zobrazit akci vždy
        }
    }
});
