const CartList = () => {

    const storageKeys = Object.keys(localStorage); 
    const storageValues = storageKeys.map((key) => {
        try {
            return JSON.parse(localStorage.getItem(key)); 
        } catch (error) {
            return localStorage.getItem(key); 
        }
    });

    return (
        <>
        {storageValues.map((item, index)=>(
            <div key={index}>{item.title.replace(/[<b></b>]/g, '')}</div>))}
        </>
    )
    
}

export default CartList;