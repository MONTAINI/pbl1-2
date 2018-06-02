class AttendanceController < ApplicationController
  # 全員の一ヶ月分
  def atnds_all_students
    usersSc = User.select('id, attendance_number, user_name').where(fiscal_year: 2018)
    usersSc = usersSc.map{ |u| u.attributes }
    usersCc = Array.new()
    for user in usersSc
      user = user.map{ |k, v| [k.camelize(:lower), v] }.to_h
      usersCc.push(user)
    end

    dates = Day.select('date').where(school_day: true, date: (params[:year] + '-' + params[:month] + '-01').to_date.all_month).pluck(:date)

    atndsSc = Attendance.select('id, user_id, date, atnd1, atnd2, atnd3, atnd4, atnd5, came_at, leaved_at')
                .where(date: (dates[0])..(dates[dates.length - 1])).order('date ASC')
    atndsSc = atndsSc.map{ |u| u.attributes }
    atndsCc = Array.new()
    for atnd in atndsSc
      atnd = atnd.map{ |k, v| [k.camelize(:lower), v] }.to_h
      unless atnd['cameAt'].blank?
        atnd['cameAt'] = atnd['cameAt'].to_time.strftime("%X")
      end
      unless atnd['leavedAt'].blank?
        atnd['leavedAt'] = atnd['leavedAt'].to_time.strftime("%X")
      end
      atndsCc.push(atnd)
    end

    render json: {dates: dates, users: usersCc, atnds: atndsCc}
  end

  # 生徒一人の一ヶ月分
  def atnds_one_student
    user = User.select('id, attendance_number, user_name').find_by(fiscal_year: 2018, id: params[:student]).attributes

    dates = Day.select('date').where(school_day: true, date: (params[:year] + '-' + params[:month] + '-01').to_date.all_month).pluck(:date)

    atndsSc = Attendance.select('date, atnd1, atnd2, atnd3, atnd4, atnd5, came_at, leaved_at')
                .where(user_id: params[:student], date: (dates[0])..(dates[dates.length - 1])).order('date asc')
    atndsSc = atndsSc.map{ |u| u.attributes }
    atndsCc = Array.new()
    atndsSc.each_with_index do |atnd, idx|
      atnd = atnd.map{ |k, v| [k.camelize(:lower), v] }.to_h
      if atnd['date'] != dates[idx]
        atndsSc.insert(idx, Hash.new())
        atnd = Hash.new()
        atnd['date'] = dates[idx]
        atnd['atnd1'], atnd['atnd2'], atnd['atnd3'], atnd['atnd4'], atnd['atnd5'] = 6, 6, 6, 6, 6;
      elsif
        unless atnd['cameAt'].blank?
          atnd['cameAt'] = atnd['cameAt'].to_time.strftime("%X")
        end
        unless atnd['leavedAt'].blank?
          atnd['leavedAt'] = atnd['leavedAt'].to_time.strftime("%X")
        end
      end
      atndsCc.push(atnd)
    end

    render json: {id: user['id'], attendanceNumber: user['attendance_number'], userName: user['user_name'], atnds: atndsCc}
  end

  # 出席状況の更新
  def update_attendance
    state = JSON.parse(request.body.read).to_a
    atnd = Attendance.find_by(user_id: params[:student], date: params[:date])
    if atnd == nil
      atnd = Attendance.new(user_id: params[:student], date: params[:date], atnd1: 6, atnd2: 6, atnd3: 6, atnd4: 6, atnd5: 6)
      atnd.save
    end
    atnd.update(state[0][0] => state[0][1])

    startAts = Array.new()
    startAts[0], startAts[1], startAts[2], startAts[3], startAts[4] \
      = '09:20:00'.to_time, '10:20:00'.to_time, '11:20:00'.to_time, '13:00:00'.to_time, '14:00:00'.to_time
    states = Array.new()
    states[0], states[1], states[2], states[3], states[4] = atnd['atnd1'], atnd['atnd2'], atnd['atnd3'], atnd['atnd4'], atnd['atnd5']

    # 登校時刻の更新
    states.each_with_index do |state, idx|
      case state
      when 0
        atnd['came_at'] = startAts[idx].strftime("%X")
        break
      when 1
        atnd['came_at'] = (startAts[idx] + (60*15)).strftime("%X")
        break
      end
    end

    # 下校時刻の更新
    states.each_with_index.reverse_each do |state, idx|
      if state == 0 || state == 1
        atnd['leaved_at'] = (startAts[idx] + (60*50)).strftime("%X")
        break
      end
    end

    atnd.update(came_at: atnd['came_at'], leaved_at: atnd['leaved_at'])
    render json: {cameAt: atnd['came_at'].strftime("%X"), leavedAt: atnd['leaved_at'].strftime("%X")}
  end
end
