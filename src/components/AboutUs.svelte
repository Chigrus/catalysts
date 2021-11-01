<script>
    export let about;
    export let aboutList;
</script>

<div class="content">
    <div class="image">
        <div class="img_block">
            <img src="uploads/aboutimage.jpg" alt="" />
        </div>
    </div>
    <div class="info">
    {#each about as item}
        <div class="subtitle">{item.subtitle}</div>
        <div class="title">{@html item.title}</div>
        <div class="text">{item.text}</div>
        <ul class="list">
            {#each aboutList as list}
            <li class="item">{@html list.title}</li>
            <li class="item">{@html list.subtitle}</li>
            <li class="item">{@html list.text}</li>
            {/each}
        </ul>
        <a href="tel:89283111110" class="call">Позвонить</a>
    {/each}
    </div>
</div>

<style>
.content{
    float: left;
    width: 100%;
    padding: 120px 0;
}

.image{
    float: left;
    width: 50%;
}

.image img{
    max-width: 100%;
    height: auto;
    -webkit-box-shadow: 0px 0px 40px 0px rgba(50, 50, 50, 0.15);
    -moz-box-shadow: 0px 0px 40px 0px rgba(50, 50, 50, 0.15);
    box-shadow: 0px 0px 40px 0px rgba(50, 50, 50, 0.15);
}

.info{
    float: left;
    width: 50%;
}

.img_block{
    position: relative;
    width: max-content;
}

.img_block::before{
    content: '';
    position: absolute;
    right: -70px;
    bottom: -30px;
    width: 350px;
    height: 287px;
    background-image: url(/img/bird.png);
}

.subtitle{
    font-family: SegoeScript-Regular;
    font-size: 33px;
    color: #ffc926;
}

.title{
	font-family: MyriadPro-Bold;
    font-size: 55px;
    color: #515252;
    margin-top: 10px;
    line-height: 1em;
}

.text{
    font-size: 17px;
    color: #4c4c4c;
    margin-top: 20px;
    line-height: 1.5em;
}

.list{
    float: left;
    width: 100%;
    margin: 15px 0 45px 0;
    list-style-type: none;
    padding: 0;
}

.item{
    position: relative;
    float: left;
    padding-left: 70px;
    padding-right: 30px;
    color: #333333;
    font-size: 16px;
    line-height: 1.2em;
    margin: 20px 0;
}

.item::before{
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -30px;
    width: 60px;
    height: 60px;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center center;
    border-radius: 50%;
}

.item:nth-child(1)::before{
    background-image: url(/svg/i1.svg);
}

.item:nth-child(2)::before{
    background-image: url(/svg/i2.svg);
}

.item:nth-child(3)::before{
    background-image: url(/svg/i3.svg);
}

.call{
    float: left;
    width: auto;
    border-radius: 25px;
    background-color: #515253;
    color: #ffca00;
    font-size: 16px;
    padding: 15px 40px;
    letter-spacing: 3px;
    text-decoration: none;
    text-transform: uppercase;
}

@media only screen and (max-width: 1240px){
	.image{
		width: 400px;
	}

    .img_block{
        width: 100%;
    }

    .info{
        width: calc(100% - 400px);
        box-sizing: border-box;
        padding-left: 100px;
    }
}

@media only screen and (max-width: 1023px){
    .info{
        width: 100%;
        padding-left: 0;
        margin-top: 60px;
    }

    .title{
        font-size: 40px;
    }
}
</style>