export const initialState = {
    status: 'no-authenticated',
    user: {},
    errorMessage:undefined
};

export const authenticatedState = {
    status: 'authenticated',
    user: { uid: 'abc',
            name:'walter'
    },
    errorMessage:undefined
};

export const notAuthenticatedState = {
    status: 'no-authenticated',
    user: {},
    errorMessage:undefined
};

