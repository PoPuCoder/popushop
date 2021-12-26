const UserModel = {
    Initialize: function () {
        localStorage.setItem('users', JSON.stringify(USERS));
    },

    UpdateAll: function (data) {
        localStorage.setItem('users', JSON.stringify(data));
    },

    getAll: function () {
        return JSON.parse(localStorage.getItem('users'));
    },

    isExistUser(value) {
        let isExist = false;
        this.getAll().forEach((user) => {
            if (user.username == value) isExist = true;
        });
        return isExist;
    },

    setUserCurrent(user) {
        localStorage.setItem('userCurrent', JSON.stringify(user));
        localStorage.setItem('username', JSON.stringify(user.username));
    },

    changePass({ username, password, ...userCurrentTemp }, newPassword) {
        const users = this.getAll();
        users.forEach((user) => {
            if (user.username == username) {
                user.password = newPassword;
                password = newPassword;
            }
        });

        userCurrent = { username, password, ...userCurrentTemp };

        this.setUserCurrent(userCurrent);
        this.UpdateAll(users);
    },

    chaneInfo(infoNew, { username, ...userCurrentTemp }) {
        const users = this.getAll();

        users.forEach((user) => {
            if (user.username == username) {
                user.fullname = infoNew.fullname;
                user.address = infoNew.address;
                user.phone = infoNew.phone;

                userCurrentTemp.fullname = infoNew.fullname;
                userCurrentTemp.address = infoNew.address;
                userCurrentTemp.phone = infoNew.phone;
            }
        });

        userCurrent = { username, ...userCurrentTemp };

        this.setUserCurrent({ username, ...userCurrentTemp });
        this.UpdateAll(users);
    },

    getIdMax() {
        return Math.max(...this.getAll().map((user) => user.id));
    },
};

if (UserModel.getAll() == null) UserModel.Initialize();
