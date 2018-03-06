let temp = `
    <div class="nav-inner"
        name="spread">
        <div class="logo">
            <img src="#{logo}" alt="logo">
        </div>
        <div class="nav-customer-Info">
            <div class="pure-g">
                <div class="pure-u-1 portrait">
                    <img src="#{portrait}" alt="用户头像">
                </div>
            </div>
            <div class="pure-g">
                <div class="pure-u-1 username">
                    <h1 class="ellipsis-words float-l"
                        title="#{username}">#{username}</h1>
                    <h2 class="float-l">
                        <a id="logout" class="cursor-pointer">
                            <i class="fa fa-sign-out" title="注销"></i>
                        </a>
                        |
                        <a href="#">
                            <i class="fa fa-cog" title="设置"></i>
                        </a>
                    </h2>
                </div>
            </div>
        </div>
        <div class="pure-menu">
            <ul class="pure-menu-list">
                <li class="pure-menu-item active">
                    <a href="/monitor/home"
                        class="pure-menu-link active">监控系统</a>
                </li>
                <li class="pure-menu-item">
                    <a href="#" 
                        class="pure-menu-link">用户系统</a>
                </li>
            </ul>
        </div>
    </div>

    <div class="nav-inner hidden"
        name="pick_up">
        <div class="logo">
            <img src="#{logo}" alt="logo">
        </div>
        <div class="nav-customer-Info">
            <div class="pure-g">
                <div class="pure-u-1 portrait pick-up"
                    title="#{username}">
                    <img src="#{portrait}" alt="用户头像">
                </div>
            </div>
            <div class="pure-g">
                <div class="pure-u-1 username pick-up">
                    <a id="logout">
                        <i class="fa fa-sign-out" title="注销"></i>
                    </a>
                    |
                    <a href="#"><i class="fa fa-cog" title="设置"></i></a>
                </div>
            </div>
        </div>
    </div>
    `;

export default temp;