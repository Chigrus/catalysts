<script>
    export let centerSlide;
    export let catalogList;
</script>


{#each catalogList as item, index}
    <div class={index === centerSlide ? 'slide active' : 'slide'} style="background-image: url({item.image})">
        <div class="price">{item.subtitle}</div>
        <div class="title">{item.title}</div>
    </div>
{/each}


<style>
.slide{
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin: 0 15px;
    box-sizing: border-box;
    padding: 50px 20px;
    padding-bottom: 270px;
    border-radius: 5px;
    background-position: top center;
    background-repeat: no-repeat;
    background-size: cover;
}

/* .slide::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: rgba(255,255,255,0.5);
} */

.slide.active{
    padding-top: 70px;
    padding-bottom: 290px;
    margin-top: -20px;
    -webkit-box-shadow: 0px 0px 40px 0px rgba(50, 50, 50, 0.15);
    -moz-box-shadow: 0px 0px 40px 0px rgba(50, 50, 50, 0.15);
    box-shadow: 0px 0px 40px 0px rgba(50, 50, 50, 0.15);
}

.slide.active::before{
    content: none;
}

.price{
    position: relative;
    z-index: 1;
    width: 100%;
    color: #ffc033;
    font-size: 70px;
    font-family: MyriadPro-Bold;
    text-align: center;
}

.title{
    position: relative;
    z-index: 1;
    width: 100%;
    color: #fff;
    font-size: 32px;
    text-align: center;
    margin-top: 15px;
}

@media only screen and (max-width: 1199px){
    .price{
        font-size: 54px;
    }

    .title{
        font-size: 28px;
    }
}

@media only screen and (max-width: 1023px){
    .slide.active{
        padding-top: 50px;
        padding-bottom: 270px;
        margin-top: 0;
        box-shadow: none;
    }
}

@media only screen and (max-width: 479px){
    .slide{
        padding-bottom: 300px;
    }

    .slide.active{
        padding-bottom: 300px;
    }

    .price{
        font-size: 44px;
    }

    .title{
        font-size: 20px;
    }
}
</style>