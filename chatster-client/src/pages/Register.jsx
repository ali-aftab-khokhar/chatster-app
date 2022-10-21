import { Button, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import CONSTANTS from '../constants';
import './style.css'
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../firebase'
import { toast } from 'react-toastify';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import UserService from '../services/userService';

const Register = () => {
    const user = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        imageURL: undefined,
    }
    const [newUser, setNewUser] = useState(user)
    const navigate = useNavigate()
    const UserServiceObj = new UserService()

    const onChangeHandler = (e) => {
        if (e.target.name === CONSTANTS.IMAGE_FIELD) {
            setNewUser((prev) => ({
                ...prev,
                [e.target.name]: e.target.files[0]
            }))
        } else {
            setNewUser((prev) => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
        }
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
        marginTop: 10,
    }));

    const onSubmitHandler = async (e) => {
        if (!validUser) {
            toast.error(CONSTANTS.PASSWORD_NOT_SAME)
        } else {
            const displayName = newUser.name
            const photoURL = newUser.imageURL
            const { email, password } = newUser
            // const res = await createUserWithEmailAndPassword(auth, email, password)
            // const date = new Date().getTime();
            // const storageRef = ref(storage, `${displayName + date}`);
            try {
                // await uploadBytesResumable(storageRef, photoURL).then(() => {
                //     getDownloadURL(storageRef).then(async (downloadURL) => {
                //         await updateProfile(res.user, {
                //             displayName,
                //             photoURL: downloadURL
                //         })
                //         await setDoc(doc(db, CONSTANTS.USERS_SCHEMA, res.user.uid), {
                //             uid: res.user.uid,
                //             displayName,
                //             email,
                //             photoURL: downloadURL,
                //         });
                //         await setDoc(doc(db, CONSTANTS.USER_CHATS_SCHEMA, res.user.uid), {})
                //     })
                // });
                UserServiceObj.registerNewUser({
                    displayName: newUser.name,
                    email: newUser.email,
                    password: newUser.password
                })
                toast.success(CONSTANTS.SUCCESSFULLY_SIGNED_UP)
                // navigate(CONSTANTS.ENROUTE_LOGIN)
            } catch {
                toast.error(CONSTANTS.SIGNUP_FAILED)
            }
        }
    }

    const validUser = () => {
        if (newUser.password === newUser.confirmPassword) {
            return true
        } else {
            return false
        }
    }

    const navigateToLogin = () => {
        navigate(CONSTANTS.ENROUTE_LOGIN)
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
                            <TextField color={CONSTANTS.SUCCESS_COLOR} onChange={onChangeHandler} id={CONSTANTS.NAME_FIELD} label={CONSTANTS.NAME_LABEL} name={CONSTANTS.NAME_FIELD} variant={CONSTANTS.VARIENT_OUTLINED} />
                        </div>
                        <div>
                            <TextField color={CONSTANTS.SUCCESS_COLOR} onChange={onChangeHandler} type={CONSTANTS.EMAIL_FIELD} id={CONSTANTS.EMAIL_FIELD} label={CONSTANTS.EMAIL_LABEL} name={CONSTANTS.EMAIL_FIELD} variant={CONSTANTS.VARIENT_OUTLINED} />
                        </div>
                        <div>
                            <TextField color={CONSTANTS.SUCCESS_COLOR} onChange={onChangeHandler} type={CONSTANTS.PASSWORD_FIELD} id={CONSTANTS.PASSWORD_FIELD} label={CONSTANTS.PASSWORD_LABEL} name={CONSTANTS.PASSWORD_FIELD} variant={CONSTANTS.VARIENT_OUTLINED} />
                        </div>
                        <div>
                            <TextField color={CONSTANTS.SUCCESS_COLOR} onChange={onChangeHandler} type={CONSTANTS.PASSWORD_FIELD} margin={CONSTANTS.MARGIN_NORMAL} id={CONSTANTS.CONFIRM_PASSWORD_FIELD} label={CONSTANTS.CONFIRM_PASSWORD_LABEL} name={CONSTANTS.CONFIRM_PASSWORD_FIELD} variant={CONSTANTS.VARIENT_OUTLINED} />
                        </div>
                        <div className='imageSection'>
                            <Div>
                                <Button color={CONSTANTS.SUCCESS_COLOR} onChange={onChangeHandler} variant={CONSTANTS.VARIENT_CONTAINED} component={CONSTANTS.COMPONENT_LABEL}>{CONSTANTS.UPLOAD_FILE}<input name={CONSTANTS.IMAGE_FIELD} type={CONSTANTS.TYPE_FILE} hidden /> </Button><br />
                                {
                                    newUser.imageURL !== undefined ? <ImageThumb image={newUser.imageURL} /> : null
                                }
                            </Div>
                        </div>
                        <div>
                            <Button color={CONSTANTS.SUCCESS_COLOR} margin={CONSTANTS.MARGIN_NONE} variant={CONSTANTS.VARIENT_CONTAINED} onClick={onSubmitHandler}>{CONSTANTS.SIGNUP}</Button>
                        </div>
                        <RouteToOtherPage onClick={navigateToLogin}>
                            {CONSTANTS.NAVIGATE_TO_LOGIN}
                        </RouteToOtherPage>
                    </Box>
                </Grid>
            </form>
        </div>
    )
}

const ImageThumb = ({ image }) => {
    return <img src={URL.createObjectURL(image)} alt={image.name} width={CONSTANTS.IMAGE_WIDTH_20} />;
};

export default Register