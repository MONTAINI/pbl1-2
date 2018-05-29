class AttendanceController < ApplicationController
  # 全員の一ヶ月分
  def atndsAllStudents
    usersSc = User.select('id, attendance_number, user_name').where(fiscal_year: 2018)
    usersSc = usersSc.map{ |u| u.attributes }
    usersCc = Array.new()
    for user in usersSc
      user = user.map{ |k, v| [k.camelize(:lower), v] }.to_h
      usersCc.push(user)
    end

    dates = Day.select('date').where(school_day: true, date: (params[:year] + '-' + params[:month] + '-01').to_date.all_month).pluck(:date)

    atndsSc = Attendance.select('id, user_id, date, atnd1, atnd2, atnd3, atnd4, atnd5, came_at, leaved_at').where(date: (dates[0])..(dates[dates.length - 1]))
    atndsSc = atndsSc.map{ |u| u.attributes }
    atndsCc = Array.new()
    for atnd in atndsSc
      atnd = atnd.map{ |k, v| [k.camelize(:lower), v] }.to_h
      atnd['cameAt'] = atnd['cameAt'].to_time.strftime("%X")
      atnd['leavedAt'] = atnd['leavedAt'].to_time.strftime("%X")
      atndsCc.push(atnd)
    end

    render json: {dates: dates, users: usersCc, atnds: atndsCc}
  end

  # 生徒一人の一ヶ月分
  def atndsOneStudent
    user = User.select('id, attendance_number, user_name').find_by(fiscal_year: 2018, id: params[:student]).attributes

    dates = Day.select('date').where(school_day: true, date: (params[:year] + '-' + params[:month] + '-01').to_date.all_month).pluck(:date)

    atndsSc = Attendance.select('date, atnd1, atnd2, atnd3, atnd4, atnd5, came_at, leaved_at')
                .where(user_id: params[:student], date: (dates[0])..(dates[dates.length - 1]))
    atndsSc = atndsSc.map{ |u| u.attributes }
    atndsCc = Array.new()
    atndsSc.each_with_index do |atnd, idx|
      atnd = atnd.map{ |k, v| [k.camelize(:lower), v] }.to_h
      if atnd['date'] != dates[idx]
        atndsSc.insert(idx, Hash.new()) # 添字を増やすため
        atnd = Hash.new()
        atnd['date'] = dates[idx]
      elsif
        atnd['cameAt'] = atnd['cameAt'].to_time.strftime("%X")
        atnd['leavedAt'] = atnd['leavedAt'].to_time.strftime("%X")
      end
      atndsCc.push(atnd)
    end

    render json: {id: user['id'], attendanceNumber: user['attendance_number'], userName: user['user_name'], atnds: atndsCc}
  end

  # 出席状況の更新
  def updateAttendance
  end
end
