<script>
    export let reviews;
    export let reviewsList;
</script>

<div class="content">
    {#each reviews as item}
        <div class="subtitle">{@html item.subtitle}</div>
        <div class="title"><h2>{@html item.title}</h2></div>
    {/each}
    <div class="reviewList">
        {#each reviewsList as review, index}
            <div class="review">{review.image}</div>
            {#if index == 0}
                <div class="review info">
                    <div class="reviewInfoTitle">Видео отзывы<br> <span>Более 100 отзывов</span></div>
                </div>
            {/if}
        {/each}
    </div>
</div>

<style>
.content{
    float: left;
    width: 100%;
    padding: 0 0 120px 0;
}

.subtitle{
    float: left;
    width: 100%;
    text-align: center;
    color: #ffc926;
    font-size: 33px;
    font-family: SegoeScript-Regular;
}

.title{
    float: left;
    width: 100%;
    text-align: center;
    margin-top: 20px;
}

.title h2{
    font-size: 55px;
    color: #515252;
    line-height: 1.2em;
    font-weight: normal;
    font-family: MyriadPro-Bold;
    text-transform: uppercase;
}

.reviewList{
    float: left;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 45px;
}

.review{
    display: flex;
    width: calc(100%/3 - 20px);
    height: 250px;
    background-color: #f6f6f6;
    border-radius: 2px;
    overflow: hidden;
    margin: 15px 0;
}

.review.info{
    align-items: center;
    background-color: #ffca00;
    background-image: url(/svg/bird.svg);
    background-repeat: no-repeat;
    background-position: right bottom;
    box-sizing: border-box;
    padding: 0 60px;
    -webkit-box-shadow: 0px 0px 40px 0px rgba(50, 50, 50, 0.15);
    -moz-box-shadow: 0px 0px 40px 0px rgba(50, 50, 50, 0.15);
    box-shadow: 0px 0px 40px 0px rgba(50, 50, 50, 0.15);
}

.review:nth-child(3n+2){
    margin: 15px 30px;
}

.reviewInfoTitle{
    position: relative;
    font-size: 24px;
    color: #fff;
    font-family: MyriadPro-Bold;
    padding-top: 100px;
    line-height: 1em;
}

.reviewInfoTitle span{
    font-size: 14px;
}

.reviewInfoTitle::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    background-image: url(/svg/video.svg);
    background-repeat: no-repeat;
    background-position: 0 0;
}

@media only screen and (max-width: 1023px){
    .review{
        width: calc(100%/2 - 20px);
        margin: 10px;
    }

    .review:nth-child(3n+2){
        margin: 10px;
    }
}

@media only screen and (max-width: 639px){
    .title h2{
        font-size: 36px;
    }
    .review{
        width: calc(100% - 20px);
    } 
}

@media only screen and (max-width: 479px){
    .content{
        padding: 0 0 60px 0;
    }
    .review{
        width: 100%;
        margin: 10px 0;
    }
    .review:nth-child(3n+2){
        margin: 10px 0;
    }
}
</style>