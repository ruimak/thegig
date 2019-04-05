export const regexFields = (uid, entriesToUpdateObj) => database()
.ref(`/users/${uid}`)
.update(entriesToUpdateObj);