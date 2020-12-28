
let addToCat = document.querySelectorAll('.add-to-cart')
addToCat.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
        let product = btn.dataset.product
        console.log(product)
    })


})