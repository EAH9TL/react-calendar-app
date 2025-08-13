import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice"

const exampleUser = {
    name: 'Andre León',
    uid: '1'
}

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking())
        try {
            const { data } = await calendarApi.post('/auth', { email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))
        } catch (error) {
            console.log(error);
            // dispatch(onLogout('Credenciales incorrectas'))
            // setTimeout(() => {
            //     dispatch(clearErrorMessage())
            // }, 10);


            //* only if back-end are not available. Delete when backend works
            localStorage.setItem('token', 'usyiuyiuyiausydiauysdiauysd')
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin(exampleUser))
        }
    }

    const startRegister = async ({ name, email, password }) => {
        console.log({ name, email, password });
        dispatch(onChecking())
        try {
            const { data } = await calendarApi.post('/auth/new', { name, email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || 'Error'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token')

        if (!token) return dispatch(onLogout())

        try {
            const { data } = await calendarApi.get('/auth/renew')
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))
        } catch (error) {
            console.log(error);
            // localStorage.clear()
            // dispatch(onLogout(''))

            //* only if back-end are not available. Delete when backend works
            localStorage.setItem('token', 'usyiuyiuyiausydiauysdiauysd')
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin(exampleUser))
        }
    }

    const startLogout = () => {
        localStorage.clear()
        dispatch(onLogout())
    }

    return {
        //* Propiedades
        status, user, errorMessage,
        //* Métodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}