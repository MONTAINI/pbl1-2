class Day < ApplicationRecord
  has_many :attendances, dependent: :destroy
end
