class Day < ApplicationRecord
  has_many :attendances, foreign_key: :date, primary_key: :date, dependent: :destroy
end
