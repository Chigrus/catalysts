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
    padding-left: 44px;
    background-image: url(/svg/logo.svg);
    background-repeat: no-repeat;
    background-position: top left;
    background-size: 34px auto;
}

.name{
    font-size: 24px;
    color: #515253;
    line-height: 1em;
}

.subname{
    font-size: 14px;
    color: #636465;
    font-family: MyriadPro-Cond;
    letter-spacing: 5px;
}
</style>