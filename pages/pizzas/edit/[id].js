
import Head from 'next/head'
import Layout from '../../../components/layout'
import { useState, useEffect } from 'react'
import TransferList, { not } from '../../../components/transferlist'
import PizzaService from '../../../services/pizzas'
import IngredientService from '../../../services/ingredients'
import { makeStyles } from '@material-ui/core/styles';
import Input from '../../../components/input'
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { DropzoneArea } from 'material-ui-dropzone'
import cloudinaryService from '../../../services/cloudinary'
import { useForm } from 'react-hook-form'
import { PIZZAVALIDATOR } from '../../../app/validators/pizzavalidator'
import { getBuilderProp } from '../../../app/application/validatorbuilder'

export async function getServerSideProps(context) {
    return {
        props: { id: context.params.id }, // will be passed to the page component as props
    }
}
const useStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        display: 'grid',
        gridTemplateRows: 'auto auto auto auto',
        gridRowGap: '8px',
    },
}));

export default function Edit({ id }) {
    const classes = useStyles();

    const [send, sendState] = useState(false)
    const [loaded, setLoaded] = useState(false);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([])
    const [image, setImage] = useState(null);
    const { handleSubmit, register, errors } = useForm();
    const [pizza, setPizza] = useState(null);

    useEffect(() => {
        async function getPizza() {
            if (!loaded) {
                const ingredients = await IngredientService.getAll();
                const pizza = await PizzaService.get(id);
                const pizzasId = pizza.ingredients.map(p => p.id)
                const unusedIngredients = ingredients.filter(i => !pizzasId.includes(i.id))

                setRight(pizza.ingredients)
                setLeft(unusedIngredients);
                setPizza(pizza);
                setLoaded(true);
            }
        }
        getPizza()
    }, [])

    const validators = {
        validator: getBuilderProp(PIZZAVALIDATOR),
        register,
        errors
    }

    async function onSubmit(data) {
        sendState(true);
        try {
            data = { ...data, ingredients: right, image: image }
            await PizzaClient.add(data)
        }
        finally {
            sendState(false);
        }
    }
    const transferProps = {
        left,
        leftTitle: "Ingredientes",
        right,
        rightTitle: "Utilizados",
        setLeft,
        setRight
    }
    function renderLayout() {
        if (!pizza) return null;
        return (
            <Layout>
                <form className={classes.container} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Input label="Nombre *" type="text" name="name" validators={validators} value={pizza.name} />
                    <TransferList {...transferProps} />
                    <DropzoneArea
                        initialFiles={[cloudinaryService.getUrlImage(pizza.image)]}
                        acceptedFiles={['image/*']}
                        dropzoneText={"Arrastrar imagen o hacer click"}
                        filesLimit={1}
                        onChange={uploadImage}
                    />
                    <div className="button-container">
                        <Button type="submit" variant="contained" color="primary">
                            Guardar
                    </Button>
                    </div>
                </form>
            </Layout>
        )

    }
    function linear() {
        if (send) {
            return (<LinearProgress />)
        }
        return null;
    }

    async function uploadImage(ev) {
        if (ev[0]) {
            const image = await cloudinaryService.upload(ev[0])
            setImage(image)
            return;
        }
        setImage(null)
    }

    return (
        <>
            <Head>
                <title>Editar pizza </title>
            </Head>
            {linear()}
            {renderLayout()}
        </>
    )
}
