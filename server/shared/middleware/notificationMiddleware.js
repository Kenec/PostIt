import { Messages } from '../../models';

/**
 * notification - middleware to prepare notification data
 * @param  {object} req incoming request object
 * @param  {object} res server respose object
 * @param {function} next calls the next function
 * @return {json} returns json response
 */
export default ((req, res, next) => {
  const notification = [];
  if (!(req.params.messageId
    && req.body.messageReaders
    && req.body.groupId
  )) {
    return res.status(400).send({
      message: 'Invalid request.Some column(s) column are missing'
    });
  }
  // find a message where message id
  Messages.find({
    where: {
      id: req.params.messageId,
    }
  })
    .then((messageRes) => {
      // if message is found, add notification
      if (messageRes.length !== 0) {
        req.body.messageReaders.map((messageReader) => {
          const userId = messageReader.userId;
          const readStatus = messageReader.readStatus;
          notification.push({
            userId,
            read: readStatus,
            groupId: req.body.groupId,
            senderId: req.body.senderId,
            messageId: req.params.messageId,
          });
          return notification;
        });
        req.notification = notification;
        next();
      }
    })
    .catch(error => res.status(500).send(error));
});

