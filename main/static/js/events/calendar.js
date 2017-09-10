var days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
var months = ["Январь",
              "Февраль",
              "Март",
              "Апрель",
              "Март",
              "Июнь",
              "Июль",
              "Август",
              "Сентябрь",
              "Октябрь",
              "Ноябрь",
              "Декабрь"]
 function daysInMonth(date){
  		count = days[date["month"] - 1];
      // alert(count)
      if (date["month"] == 2 && date["year"]%4 != 0){
        count = count -1
      }
      return count
  	};
var weekday = [6, 0, 1, 2, 3, 4, 5]
function calendar(year_month=null){
        if (year_month == null){
        date = tempus()
        date.day = 1
      } else {
          date = tempus(year_month, "%Y-%m")
          // alert(year_month)
        }
        $("#calendar .month ul li#month").contents().replaceWith(months[date.get()["month"] - 1])
        $("#calendar .month ul span#year").contents().replaceWith(date.get()["year"])

        var prev_date = date.calc({"month": -1}).format("%Y-%m");
        $("#calendar .prev").attr("onclick", "calendar('" + prev_date + "')");
        var next_date = date.calc({"month": +2}).format("%Y-%m");
        $("#calendar .next").attr("onclick", "calendar('" + next_date + "')");
        // alert(prev_date)
        date.calc({"month": -1})
        prev_date = tempus(prev_date, "%Y-%m")
        var prevMonthDays = daysInMonth(prev_date.get())
        var monthDays = daysInMonth(date.get())
        var days = [];
        today = tempus().get()
        // alert(prev_date)
        if (weekday[date.get()["dayOfWeek"]] != 0){
          // alert(date.get()["dayOfWeek"])
        for (var i = prevMonthDays - weekday[date.get()["dayOfWeek"]]; i < prevMonthDays; i++){
          days.push("<span class=notactive>" + i + "</span>")
        }}
        for (var i = 1; i <= monthDays; i++){
          if (i == today["day"] && date.get()["month"] == today["month"]){
          days.push("<span class=active>" + i + "</span>")
        } else {
          days.push(String(i))
        }
        }
        for (var i = 0; i <= (35 - days.lendth); i++){
          days.push("<span class=notactive>" + i + "</span>")
        }
        $("#calendar .days").children().each(function(i){
          $(this).contents().replaceWith(days[i])
        })
}
