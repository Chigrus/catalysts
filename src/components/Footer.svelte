<script>
    let currentTime = new Date();
    let year = currentTime.getFullYear();
</script>

<div class="content">
    © {year} <span class="domain">www.splavld.ru</span> Все права защищены
</div>
<style>
.content{
    float: left;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 45px 0;
    border-top: 1px dashed #dddddd;
    font-size: 16px;
    color: #999999;
}

.domain{
    text-transform: uppercase;
    margin: 0 7px;
    color: #515252;
}

@media only screen and (max-width: 375px){
    .content{
        flex-wrap: wrap;
        padding: 20px 0;
    }
    .domain{
        width: 100%;
        margin: 5px 0;
        text-align: center;
    }   
}
</style>