import SessionService from '../../../app/application/sessionservice';
import handler from '../../../app/middelwares/nextconnect';
import services from '../../../app/middelwares/service';

const connect = handler();
connect.post(services(SessionService), async (req, res) => {
    const session = await req.service.update(req.query.id);
    res.json(session);
})

export default connect;