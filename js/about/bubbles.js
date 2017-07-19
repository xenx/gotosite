var width = $(window).width();
var height = $(window).height();

var popup = false;

var maxRadius = 110;
var minRadius = 30;

var right_border = width - maxRadius;
var left_border = maxRadius;

var top_border = maxRadius;
var bottom_border = height - maxRadius;

if (height < 900) {
    height = 900;
}

var svg = d3.select("#comments").append("svg")
    .attr("width", width)
    .attr("height", height);


function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

var photo_urls = ["https://goto.msk.ru/camp_summer/images/comments/nast.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/maxim.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/gridasov.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/zajceva.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/andreeva.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/dimaantonov.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/kabo.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/tsiplenkov.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/sere.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/popkova.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/svatoslav.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/gleb.jpg",
    "https://goto.msk.ru/camp_summer/images/comments/kurilev.jpg"];

var content = [
    {
        "author": "Черемисина Анастасия", "work": "Лицей №2101, г. Москва", "content": "Приехав один раз в GoTo, ты не сможешь не поехать туда снова. Это место в\
                        котором ты\
                        можешь\
                        получить знания, необходимые для реализации своих идей и проектов, даже самых немыслимых, ты\
                        всегда можешь обсудить это с преподавателем и понять, с чего надо начать, чтобы проект был\
                        завершен. А еще GoTo это место где ты всегда найдешь интересных людей, море ламповости и тепла,\
                        уютные разговоры на свечках и чаепития. GoTo это место где ты можешь оставаться собой,\
                        совершенствоваться, это маленький мир, в котором хочется жить."
    },
    {"author": "Максим Манайнен", "work": "Школа РИД, г. Санкт-Петербург", "content": "Поездки в GoTo стали одними из самых ярких моментов моей жизни, ведь это не просто лагерь с\
                        воспитательницами и няничками, а хаб единомышленников, по совместительству являющийся детским\
                        лагерем. Это одно из тех мест, где людям всё равно какого вы возраста, на каком месте в рейтинге\
                        российских школ стоит ваша, или какая у вас была оценка по математике в третьей четверти второго\
                        класса. Всё что важно здесь - это желание и способность к работе и учёбе, а так же ваш характер\
                        и мировоззрение.\
                        Моей первой поездкой в GoTo была поездка на смену в самый прекрасный город России -\
                        Санкт-Петербург. Я поехал на направление \"Аналих данных\", о чём нисколько не пожалел. Тогда я\
                        уже какое-то время изучал техники Data Science'а, но дальше решения Титаника линейной\
                        регрессией, или каким-нибудь Random Forest'ом дело не зашло, однако эта смена дала мне так\
                        нужный буст."},

    {"author": "Гридасов Илья", "work": "МФТИ, г. Магнитогорск", "content": "Мне очень понравилось в GoTo. Здесь я написал первое работающее приложение на android.\
                        Благодаря данной школе я получил полезный опыт написания проекта, причём делали его я с моим\
                        напарником почти самостоятельно, обсуждая идеи и технологии с куратором. Мы кодили приложение,\
                        которое выдавало тебе интересный факт, со встроенной рекомендательной системой. Работу мы\
                        разделили примерно так, что я занимался back-end-ом и рекомендательной системой, а напарник\
                        больше front-end-ом. В итоге, не без трудностей и неудач, мы реализовали работающее готовое\
                        приложение, которое можно было выпускать в production, ну почти. Хочется отметить, что здесь\
                        также было время на активный отдых, игры в волейбол, футбол многое другое. А также несмотря на\
                        достаточную погруженность людей в свои проекты, в воздухе царила атмосфера семьи, все обсуждали\
                        свои проекты с другими, предлагали новые идеи, а также вместе наслаждались играми и общением по\
                        душам, которому значительно способствовали очень сердечные свечки по вечерам. Таким образом,\
                        жизнь в GoTo Camp насыщает человека как мыслями, идеями, новыми технологиями, но и эмоциями,\
                            конечно, позитивными!"},

    {"author": "Зайцева Татьяна", "work": "МГУ, г. Москва", "content": "Поездка в GoTo - отличная возможность совместить активный отдых и попробовать себя в интересных\
                        проектах, а также познакомиться с ребятами со всей России, у которых горят глаза от того же, что\
                        и у тебя. В свою первую смену мы в команде реализовали управляемую оператором тележку с камерой,\
                        способную вращаться почти как угодно и так помогать оператору снимать то, что нужно, под\
                        правильным углом и освещением, а во вторую я сделала робота, запоминающего свою исходную\
                        настроенную траекторию, и потом ездящего по ней даже после выключения питания. Как оказалось,\
                        можно всего за одну смену сделать полностью задачу, в чём нам помогали отзывчивые и опытные\
                        преподаватели. Мне всё понравилось, а знания с этих смен я использую до сих пор."},

    {"author": "Андреева Мария", "work": "Школа №179, г. Москва", "content": "В GoTo какая-то особенная атмосфера в которой даже летом хочется работать и узнавать новое) Я\
                        была на нескольких сменах, но пока что попробовала только два направления: робототехнику и\
                        анализ данных. На первом мы делали много разных проектов, начиная рисующим роботом, заканчивая\
                        умной гантелей. Потом я решила что-нибудь поменять и пошла на направление АДа. Там пока что было\
                        только обучение, тк это довольно сложная тема и в ней много чего надо изучить, что б делать\
                        какие-то стоящие проекты. Очень классно объясняют, если что-то непонятно разбирают по мелочам."},

    {"author": "Дмитрий Антонов", "work": "Школа №806, г. Москва", "content": "Образовательная программа в рамках GoTo camp очень хорошая. За время поездок в лагерь я\
                        реализовал различные проекты: определение болезни по ДНК, определение изображенного на\
                        фотографии, определение человека по голосу. Это было бы невозможно, если бы не\
                        преподаватели-профессионалы, которые с радостью делятся своим опытом и знаниями. Если вам\
                        хочется освоить прикладное программирование, анализ данных и машинное обучение, биоинформатику,\
                        робототехнику и получить опыт проектной работы, то этот лагерь для вас."},

    {"author": "Евгений Кабо", "work": "Разработчик, г. Минск", "content": "Свою первую заявку подал за 30 минут до окончания срока. И никогда об этом не жалел. В этом месте\
                        прекрасно всё: от круга общения, состоящего из людей который ты вряд ли забудешь (преподаватели,\
                        вожатые, организаторы, гости, участники), до практической-полезной части, как среди\
                        программной стороны (прикладное программирование, анализ данных, биоинформатика), так среди и\
                        аппаратной(робототехника). Я\
                        был по обе стороны баррикад и знаю о чём говорю. Если вы ещё сомневаетесь, не сомневайтесь."},

    {"author": "Цыпленков Севастьян", "work": "Гимназия №5, г. Чебоксары", "content": "Ростислав отлично объясняет материал! Всегда готов помочь, если что-то не получается. С ним\
                        интересно. За эту неделю мы с ним можно сказать подружились. Хоть в нашей группе были люди,\
                        которые были продвинуты в этом направлении, благодаря Ростиславу новички не уступали по\
                        качеству продукта и иногда наоборот превосходно делали поставленную задачу."},

    {"author": "Сергей Филиппов", "work": "Экстернат Фоксфорд, г. Санкт-Петербург", "content": "Я очень благодарен лагерю GoTo. В нем я нашел множество интересных людей. Получил огромнейшую\
                        базу знаний в различных областях и закрепил эти знания различными проектами. Такими как, Мишка\
                        на дистанционном управлении через telegram для общения с детьми на расстоянии, манипулятор для\
                        автономной игры в шашки, интеллектуальную гантелю от Intel и многое другое."},

    {"author": "Екатерина Попкова", "work": "МГУ, г. Москва", "content": "Весення смена в лагере «GoTo» на специализации «биоинформатика» была для меня очень полезной и\
                        интересной. За неделю мы изучили и самостоятельно реализовали несколько базовых алгоритмов,\
                        применяющихся в биоинформатике: алгоритм Нидлмана-Вунша для выравнивания последовательностей,\
                        алгоритм восстановления вторичной структуры РНК, научились с помощью статистического теста\
                        выделять гены, изменяющие уровень экспрессии при данных условиях, относить человека к той или\
                        иной национальности исходя только из его генетического кода. Мне показалось особенно интересным,\
                        что после выполнения задания мы могли опробовать написанный алгоритм на реальных биологических\
                        данных. Параллельно мне удалось сделать проект по теме: «Оптимизация поиска сайтов\
                        РНК-редактирования в данных ICE-seq». Хотя это и был достаточно небольшой однодневный проект,\
                        было здорово попробовать себя в реальной, а не учебной, задаче, которая могла бы стоять перед\
                        исследователем-биоинформатиком."},

    {"author": "Пушкарев Святослав", "work": "Гимназия №31, г. Курган", "content": "На каждой смене GoTo Camp представлено большое количество разнообразных направлений, а участие в\
                        обучении принимает большое количество IT специалистов. Образовательный процесс увлекателен,\
                        состоит из интересных лекций и реализации различных идей учеников лагеря. Каждый, приехав в этот\
                        лагерь увозит с собой не только полученные знания, но и \"жизнеспособный\" проект.\
                        В GoTo Camp я принимал участие в реализации \"LinuxBot\",\"SmartFluffyBrick\" и \"Определитель\
                        номеров\". Два из них до сих пор развиваются, что является показателем профессионального подхода\
                        всей команды GoTo к обучению."},

    {"author": "Статкевич Глеб", "work": "Гимназия №5, г. Чебоксары", "content": "В апреле мне удалось побывать на занятиях весенней школы GoTo в Иннополисе. В самом\
                        городе я уже не первый раз, он великолепен, но особенно меня впечатлили занятия КМБ под\
                        руководством мастера Ростислава! Хочу выразить ему признательность и уважение за то, что в\
                        столь краткое время он, как истинный знаток своего дела, сумел запихнуть в наши черепные\
                        коробки массу полезной инфы и раскрутил наши 2-х ядерные процессоры до 4-х! Мне очень понравился\
                        стиль его обучения. Занятия были очень интенсивны и информативны! Собираюсь возобновить их\
                        летом!"},

    {"author": "Александр Курылёв", "work": "Школа №1357, г. Москва", "content": "В GoTo большое количество времени отводится образованию. Чаще всего бывает по три-четыре пары за\
                        день. В это время можно либо заниматься заранее выбранным проектом, с которым тебе будут\
                        помогать преподаватели, либо учиться.\
                        На протяжении всех своих смен в лагере я реализовал 3 проекта по робототехнике, 1 учебный проект\
                        по анализу данных и несколько мини-проектов по программированию.\
                        Во всех сменах преподаватели уделяли должное внимание каждому из участников и помогали\
                        разбираться с той или иной проблемой. За одну-две недели реально подтянуть свои навыки в\
                        программировании или научиться всему с нуля."}
];

var nodes = d3.range(12).map(function (i) {
    return {radius: getRandom(minRadius, maxRadius), id: i, url: photo_urls[i], padding: 50};
});


var alpha = .1;

function packup() {
    var pack = d3.layout.pack()
        .sort(null)
        .size([width, height])
        .padding(0)
        .value(function (d) {
            return d.radius;
        });

    svg.selectAll(".node").data(pack.nodes({"children": nodes})
        .filter(function (d) {
            return !d.children;
        })).enter().append('defs')
        .append('pattern')
        .attr('id', function (d) {
            return (d.id + "-icon");
        })
        .attr('width', 1)
        .attr('height', 1)
        .attr('patternContentUnits', 'objectBoundingBox')
        .append("svg:image")
        .attr("xlink:xlink:href", function (d) {
            return (d.url);
        })
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", 1)
        .attr("width", 1)
        .attr("preserveAspectRatio", "xMinYMin slice");

    svg.selectAll(".node")
        .data(pack.nodes({"children": nodes})
            .filter(function (d) {
                return !d.children;
            }))
        .enter().append("circle")
        .attr("r", function (d) {
            return d.radius;
        }).attr("class", "my_bubble_circle")
        .on("mouseover", function (d) {
            force.resume();
            d.radius += 20;
            d.padding -= 20;
            d.r = d.radius;
            d3.select(this).attr("r", d.radius);
        }).on("mouseout", function (d) {
        force.resume();
        d.radius -= 20;
        d.padding += 20;
        d.r = d.radius;
        d3.select(this).attr("r", d.radius)
    }).style("fill", function (d) {
        return ("url(#" + d.id + "-icon)")
    }).on("click", function (d) {
        toggle_popup(d.id);
    });
}

function border_check(a, b) {
    if (b) {
        if (a > right_border) {
            a = right_border;
        } else if (a < left_border) {
            a = left_border;
        }
        return a
    } else {
        if (a < top_border) {
            a = top_border;
        } else if (a > bottom_border) {
            a = bottom_border;
        }
        return a
    }
}


var force;

function forceup() {
    force = d3.layout.force()
        .nodes(nodes)
        .gravity(0.01)
        .charge(-30)
        .theta(0.8)
        .alpha(0.1)
        .size([width, height])
        .start();

    var drag = force.drag();

    force.on("tick", function () {
        var q = d3.geom.quadtree(nodes);
        var i = 0;
        var n = nodes.length;

        while (++i < n) {
            function set_collide(d) {
                var r = d.radius + maxRadius + d.padding,
                    nx1 = d.x - r,
                    nx2 = d.x + r,
                    ny1 = d.y - r,
                    ny2 = d.y + r;

                return function (quad, x1, y1, x2, y2) {
                    if (quad.point && (quad.point !== d)) {
                        var x = d.x - quad.point.x,
                            y = d.y - quad.point.y,
                            l = Math.sqrt(x * x + y * y),
                            r = d.radius + quad.point.radius + d.padding;
                        if (l < r) {
                            l = (l - r) / l * alpha;
                            d.x -= x *= l;
                            d.y -= y *= l;
                            quad.point.x += x;
                            quad.point.y += y;
                        }
                    }
                    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                }
            }

            q.visit(set_collide(nodes[i]));
        }

        svg.selectAll(".my_bubble_circle")
            .attr("cx", function (d) {
                d.x = border_check(d.x, true);
                return d.x;
            })
            .attr("cy", function (d) {
                d.y = border_check(d.y, false);
                return d.y;
            });

    });

    d3.selectAll(".my_bubble_circle").call(drag);
}

packup();
forceup();

function sdvig(t) {
    var i = 1;

    function myLoop() {
        setTimeout(function () {

            svg.selectAll(".my_bubble_circle").attr("x", function (d) {
                if (t) {
                    d.x -= 6;
                } else {
                    d.x += 6;
                }
                return d.x;
            });


            i++;
            if (i < 8) {
                myLoop();
            }
        }, 50)
    }

    myLoop();
}

function show_content(id) {
    var content_dict = content[id];

    $("#comment_content").html(content_dict["content"]);
    $("#comment_author").html(content_dict["author"]);
    $("#comment_work").html(content_dict["work"]);
}

function toggle_popup(id) {

    if (id === -1) {
        // Hide content
        force.resume();
        right_border = width - maxRadius;
        sdvig(false);

        $("#comment_wrapper").animate({
            right: "-30vw"
        }, 700);


        setTimeout(function () {
            popup = false;
        }, 700);
    } else {
        if (popup) {
            force.resume();
            // Change content
            show_content(id);

        } else {
            // Show content
            force.resume();
            sdvig(true);

            show_content(id);

            $("#comment_wrapper").animate({
                right: 0
            }, 700);

            setTimeout(function () {
                right_border = width * 0.6 - maxRadius;
                popup = true;
            }, 700);
        }
    }
}