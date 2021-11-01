<script>
    export let logo;
</script>

<div class="logo">
    <span class="name">{logo.name}</span><br>
    <span class="subname">{logo.subname}</span>
</div>

<style>
.logo{
    position: relative;
    padding-left: 50px;
    background-image: url(/svg/logo.svg);
    background-repeat: no-repeat;
    background-position: left center;
    background-size: contain;
}

.name{
    font-size: 30px;
    color: #515253;
    line-height: 1em;
}

.subname{
    font-size: 16px;
    color: #636465;
    font-family: MyriadPro-Cond;
    letter-spacing: 5px;
}
</style>