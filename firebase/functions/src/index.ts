import * as functions from 'firebase-functions';

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createUser = functions.auth.user().onCreate(event => {

    const user = event.data; // The Firebase user.
    const displayName = user.displayName; // The display name of the user.
    const id = user.uid; // The id of the user.

    return admin
        .firestore()
        .doc(`users/${id}`)
        .set({
            full_name: displayName
        });
});

exports.deleteIncidentEvents = functions.firestore
    .document(`incidents/{incidentId}`)
    .onDelete(event => {

        const incidentId = event.params.incidentId;

        return admin.firestore()
            .collection('events')
            .where('incidentId', '==', incidentId)
            .get()
            .then(snapshot => {
                // Once we get the results, begin a batch
                const batch = admin.firestore().batch();

                snapshot.forEach(doc => {
                    // For each doc, add a delete operation to the batch
                    batch.delete(doc.ref);
                });

                // Commit the batch
                return batch.commit();
            })
    });

exports.updateIncidentName = functions.firestore
    .document(`incidents/{incidentId}`)
    .onUpdate(event => {

        const incidentId = event.params.incidentId;
        const newIncidentName = event.data.data().name;


        return admin.firestore()
            .collection('events')
            .where('incidentId', '==', incidentId)
            .get()
            .then(snapshot => {
                // Once we get the results, begin a batch
                const batch = admin.firestore().batch();

                snapshot.forEach(doc => {
                    // For each doc, add a delete operation to the batch
                    batch.update(doc.ref, 'incidentName', newIncidentName)
                });

                // Commit the batch
                return batch.commit();
            })
    })