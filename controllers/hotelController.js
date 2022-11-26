const { isUser } = require('../middlewares/guards');

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('hotel/create')

})
router.post('/create', isUser(), async (req, res) => {

    const hotelData = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: req.body.rooms,
        bookedBy: [],
        owner: req.user._id
    }

    try {
        await req.storage.createHotel(hotelData);
        res.redirect('/');
    } catch (err) {
        let errors; 
        if(err.errors){
            errors = Object.values(err.errors).map(e => e.properties.message);
        }else{
            errors = [err.message]
        }
        
        const ctx = {
            errors,
            hotelData: {
                name: req.body.name,
                city: req.body.city,
                imageUrl: req.body.imageUrl,
                rooms: Number(req.body.rooms),
            }
        }

        res.render('hotel/create', ctx)
    }
})


router.get('/details/:id', async(req, res)=>{
    try {

        const hotel = await req.storage.getHotelById(req.params.id);
        hotel.hasUser = Boolean(req.user);
        hotel.isOwner = req.user && req.user._id == hotel.owner;
        hotel.isBooked = req.user && hotel.bookedBy.find(h=> h._id == req.user._id)

        res.render('hotel/details', {hotel})
        
    } catch (err) {
        console.log(err.message);
        res.redirect('/404');
    }
})
module.exports = router;