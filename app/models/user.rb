class User < ApplicationRecord
    has_secure_password
    has_many :appointments, dependent: :destroy
    has_many :doctors, through: :appointments
    validates :name, presence: true
    validates :email, presence: true, uniqueness: true
    validates :password, confirmation: true, length: { in: 5..20 }
end
