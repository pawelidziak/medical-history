import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.eventAddTrigger = functions.firestore
    .document(`incidents/{incidentId}/events/{newEventId}`)
    .onCreate(async event => {

        const incidentId = event.params.incidentId;
        const docRef = admin.firestore().collection('incidents').doc(incidentId)

        return docRef.collection('events')
            .get()
            .then(querySnapshot => {

                // get the total events count
                let eventsCount = querySnapshot.size;

                if (!eventsCount) {
                    eventsCount = 0;
                }

                // run update
                return docRef.update({eventsCount: eventsCount})
            })
            .catch(err => console.log(err) )
    });

exports.eventDeleteTrigger = functions.firestore
    .document(`incidents/{incidentId}/events/{idToDeleted}`)
    .onDelete(async event => {


        const incidentId = event.params.incidentId;
        const docRef = admin.firestore().collection('incidents').doc(incidentId)

        return docRef.collection('events')
            .get()
            .then(querySnapshot => {

                // get the total events count
                const eventsCount = querySnapshot.size;

                if (eventsCount === 0) {
                    return;
                }

                // run update
                return docRef.update({eventsCount: eventsCount})
            })
            .catch(err => console.log(err) )
    });
