<script>
    export let carService;
    export let carServiceList;
</script>

<div class="content">
    {#each carService as item}
        <div class="subtitle">{@html item.subtitle}</div>
        <div class="infoBlock">
            <div class="title">
                <h2>{@html item.title}</h2>
            </div>
            <div class="text">{@html item.text}</div>
        </div>
        <div class="serviceList">
            {#each carServiceList as service}
            <div class="service">
                <h3 class="serviceTitle">{@html service.title}</h3>
                <div class="serviceText">{@html service.text}</div>
            </div>
            {/each}
        </div>
    {/each}
</div>

<style>
.content{
    float: left;
    width: 100%;
    padding: 120px 0;
}

.subtitle{
    float: left;
    width: 100%;
    color: #ffc926;
    font-size: 33px;
    font-family: SegoeScript-Regular;
}

.infoBlock{
    float: left;
    width: 100%;
    margin-top: 30px;
}

.title{
    float: left;
    width: 50%;
}

.title h2{
    font-size: 50px;
    color: #515252;
    line-height: 1.2em;
    font-weight: normal;
    font-family: MyriadPro-Bold;
    text-transform: uppercase;
}

.text{
    float: left;
    width: 50%;
    color: #4c4c4c;
    font-size: 17px;
    line-height: 1.5em;
    box-sizing: border-box;
    padding-left: 50px;
}

.serviceList{
    float: left;
    width: 100%;
    display: flex;
    margin-top: 40px;
}

.service{
    position: relative;
    width: calc(100%/4);
    padding-top: 110px;
    box-sizing: border-box;
    padding-right: 40px;
}

.service::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    background-repeat: no-repeat;
    background-position: 0 0 ;
    background-size: cover;
}

.service:nth-child(1):before{
    background-image: url(/svg/s1.svg);
}

.service:nth-child(2):before{
    background-image: url(/svg/s2.svg);
}

.service:nth-child(3):before{
    background-image: url(/svg/s3.svg);
}

.service:nth-child(4):before{
    background-image: url(/svg/s4.svg);
}

.serviceTitle{
    width: 100%;
    font-size: 24px;
    color: #515252;
    line-height: 1.2em;
    font-weight: normal;
    font-family: MyriadPro-Bold;
    text-transform: uppercase;
}

.serviceText{
    width: 100%;
    font-size: 16px;
    color: #4c4c4c;
    line-height: 1.5em;
    margin-top: 20px;
}

@media only screen and (max-width: 1023px){
    .title h2{
        font-size: 36px;
    }

    .serviceList{
        flex-wrap: wrap;
    }

    .service{
        width: calc(100%/2);
        margin: 15px 0;
    }
}

@media only screen and (max-width: 639px){
    .title{
        width: 100%;
    }
    .title h2{
        font-size: 26px;
    }
    .text{
        width: 100%;
        padding-left: 0;
        margin-top: 25px;
    }
    .serviceTitle{
        font-size: 18px;
    }
    .service{
        padding-right: 20px;
    }
}

@media only screen and (max-width: 479px){
    .content{
        padding: 60px 0;
    }
    .service{
        width: 100%;
        padding-right: 0;
    }
    :global(.serviceTitle br){
        display: none;
    }
}
</style>