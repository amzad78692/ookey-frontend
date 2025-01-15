const backendDomin = process.env.REACT_APP_BACKEND_DOMAIN

const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/user/register`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/user/login`,
        method : "post"
    },
    googleSignIn : {
        url : `${backendDomin}/api/user/google_auth`,
        method : "post"
    },
    resetPasswordSendMail : {
        url : `${backendDomin}/api/user/reset_password_mail`,
        method : "post"
    },
    resetPassword : {
        url : `${backendDomin}/api/user/reset_password`,
        method : "post"
    },
    uploadImage : {
        url : `${backendDomin}/api/user/upload`,
        method : "post"
    },
    addCategory : {
        url : `${backendDomin}/api/category/add`,
        method : "post"
    },
    getCategories : {
        url : `${backendDomin}/api/category/get`,
        method : "get"
    },
    updateCategory : {
        url : `${backendDomin}/api/category/update`,
        method : "put"
    },
    deleteCategory : {
        url : `${backendDomin}/api/category/delete`,
        method : "delete"
    },
    current_user : {
        url : `${backendDomin}/api/session/get`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/session/delete`,
        method : 'delete'
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : 'get'
    },
    DeleteProduct : {
        url : `${backendDomin}/api/delete-product`,
        method : 'post'
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product`,
        method  : 'post'
    },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomin}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomin}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomin}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomin}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomin}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    },
    payment:{
        url : `${backendDomin}/api/checkout`,
        method : 'post'
    },
    getOrder:{
        url : `${backendDomin}/api/order-list`,
        method : 'get'
    },
    allOrder:{
        url : `${backendDomin}/api/all-order`,
        method : 'get'
    }
}


export default SummaryApi