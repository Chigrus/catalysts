<script>
    export let catalogList;
</script>


{#each catalogList as item, index}
    <div class="slide" style="background-image: url({item.image})">
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

@media only screen and (max-width: 479px){
    .slide{
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