import { Button, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import CONSTANTS from '../constants';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"
import { auth as loginAuth } from '../auth'
import { toast } from 'react-toastify';
import ContextAPI from '../context/contextAPI';
import UserService from '../services/userService';

const Login = () => {
    const user = {
        email: '',
        password: '',
    }
    const [credentials, setCredentials] = useState(user)
    const navigate = useNavigate()
    const context = useContext(ContextAPI)
    const UserServiceObj = new UserService()

    useEffect(() => {
        if (loginAuth()){
            navigate(CONSTANTS.ENROUTE_HOME)
        }
    }, [navigate])

    const onChangeHandler = (e) => {
        setCredentials((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const Div = styled(CONSTANTS.STYLED_DIV)(({ theme }) => ({
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
        fontSize: 28,
    }));

    const RouteToOtherPage = styled(CONSTANTS.STYLED_DIV)(({ theme }) => ({
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
        fontSize: 12,
    }));

    const onSubmitHandler = async (e) => {
        const user = await UserServiceObj.loginUser(credentials)
        context.activeUser = user
        console.log(context)
        // signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        //     .then((userCredential) => {
        //         const user = userCredential.user;
        //         localStorage.setItem(CONSTANTS.USER_SCHEMA, JSON.stringify(user))
        //         context.activeUser = JSON.parse((localStorage.getItem(CONSTANTS.USER_SCHEMA)))
        //         toast.success(CONSTANTS.SUCCESSFULLY_LOGGED_IN)
        //         navigate(CONSTANTS.ENROUTE_HOME)
        //     })
        //     .catch((error) => {
        //         var err = error.message.substr(error.message.indexOf(" ") + 1);
        //         toast.error(err)
        //     });
    }

    const navigateToRegister = () => {
        navigate(CONSTANTS.ENROUTE_REGISTER)
    }

    return (
        <div>
            <form>
                <Grid container spacing={0} direction={CONSTANTS.COLUMN_DIRECTION} alignItems={CONSTANTS.ALIGN_CENTER} justifyContent={CONSTANTS.ALIGN_CENTER} style={{ maxHeight: CONSTANTS.MAX_HEIGHT_70, marginTop: CONSTANTS.MARGIN_TOP_5 }}>
                    <Box bgcolor={CONSTANTS.BGCOLOR_PRIMARY_MAIN} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} noValidate autoComplete={CONSTANTS.AUTO_COMPLETE_OFF}>
                        <div>
                            <Div color={CONSTANTS.SUCCESS_COLOR}>
                                {CONSTANTS.APP_NAME}
                            </Div>
                        </div>
                        <div>
                            <TextField color={CONSTANTS.SUCCESS_COLOR} onChange={onChangeHandler} id={CONSTANTS.EMAIL_FIELD} label={CONSTANTS.EMAIL_LABEL} name={CONSTANTS.EMAIL_FIELD} variant={CONSTANTS.VARIENT_OUTLINED} type={CONSTANTS.EMAIL_FIELD} />
                        </div>
                        <div>
                            <TextField color={CONSTANTS.SUCCESS_COLOR} onChange={onChangeHandler} id={CONSTANTS.PASSWORD_FIELD} label={CONSTANTS.PASSWORD_LABEL} type={CONSTANTS.PASSWORD_FIELD} name={CONSTANTS.PASSWORD_FIELD} variant={CONSTANTS.VARIENT_OUTLINED} />
                        </div>
                        <div>
                            <Div>
                                <Button color={CONSTANTS.SUCCESS_COLOR} margin={CONSTANTS.MARGIN_NONE} variant={CONSTANTS.VARIENT_CONTAINED} onClick={onSubmitHandler}>{CONSTANTS.LOGIN}</Button>
                            </Div>
                        </div>
                        <RouteToOtherPage onClick={navigateToRegister}>
                            {CONSTANTS.NAVIGATE_TO_REGISTER}
                        </RouteToOtherPage>
                    </Box>
                </Grid>
            </form>
        </div>
    )
}

export default Login