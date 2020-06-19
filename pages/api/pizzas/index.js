//TODO crear pizza
//TODO recuperar lista de pizzas (algolia)
import handler from '../../../app/middelwares/nextconnect'
import PizzaService from '../../../app/application/pizzaservice'
import services from '../../../app/middelwares/service'

const connect = handler();

function isValid(token) {
    return true;
}

connect.post(services(PizzaService), async (req, res) => {
    if (req.headers.authorization && isValid(req.headers.authorization)) {
        const pizza = await req.service.create(req.body);
        res.status(201).json(pizza);
    }
    else {
        res.status(403).json('""')
    }
})

export default connect;