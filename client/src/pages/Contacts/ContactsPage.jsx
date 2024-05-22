import styles from "./ContactsPage.module.css"
export default function () {
    return (
        <>
        <h1>Контакты</h1>
        <div className={styles.inline}>
            <div className={styles.card}>
                <ul>
                    <li>Имя: Надежда</li>
                    <li>Номер телефона: +386-720-539-14-155</li>
                    <li>Электронная почта: fjd69@gmail.com</li>
                    <li>Должность: UI спец дизайнер</li>
                </ul>
            </div>
            <div className={styles.card}>
                <ul>
                    <li>Имя: Александр</li>
                    <li>Номер телефона: +1671-392-847-01-11</li>
                    <li>Электронная почта: 27dndf@mail.ru</li>
                    <li>Должность: Backend разработчик</li>
                </ul>
            </div>
            <div className={styles.card}>
                <ul>
                    <li>Имя: Кирилл</li>
                    <li>Номер телефона: +975-330-589-71-34</li>
                    <li>Электронная почта: dknf828.internet@mail.ru</li>
                    <li>Должность: Фронтенд разработчик</li>
                </ul>
            </div>
            <div className={styles.card}>
                <ul>
                    <li>Имя: Ярослав</li>
                    <li>Номер телефона: +377-109-682-47-08</li>
                    <li>Электронная почта: 2i8xf3@yandex.ru</li>
                    <li>Должность: Фронтенд разработчик</li>
                </ul>
            </div>
            <div className={styles.card}>
                <ul>
                    <li>Имя: Диана</li>
                    <li>Номер телефона: +1868-723-915-13-84</li>
                    <li>Электронная почта: fk3kfk@inbox.ru</li>
                    <li>Должность: Team Lead, UI/UX Specialist, DataSсience, Senior FullStack Developer, DataAnalysys, SoftwareTester, Lady-bag, ProductManager</li>
                </ul>
            </div>
            <div className={styles.card}>
                <ul>
                    <li>Имя: Эрик</li>
                    <li>Номер телефона: +220-402-792-53-00</li>
                    <li>Электронная почта: 33hjff7@bk.ru</li>
                    <li>Должность: Фронтенд разработчик</li>
                </ul>
            </div>
            <div className={styles.card}>
                <ul>
                    <li>Имя: Владислав</li>
                    <li>Номер телефона: +0-748-823-873-88</li>
                    <li>Электронная почта: lkdaf82@cupantae.com</li>
                    <li>Должность: Teach Lead</li>
                </ul>
            </div>
        </div>
        </>
    )
}
