===== 
GoTo_
===== 
Серия образовательных программ в области IT, робототехники и анализа данных
-------- 
Образовательные программы GoTo помогают молодежи со всей России воплощать в жизнь самые смелые идеи, получать знания у практикующих специалистов и предпринимателей, находить единомышленников и необходимые ресурсы для развития своих проектов, обрести мотивацию к дальнейшему осознанному развитию.

Данный репозиторий содержит инновационный контент ввиде нового сайта.

.. code-block::

  pip install -r requirements.txt
  echo "SECRET_KEY = 'test'" > gotosite/settings_secret.py
  python manage.py migrate --run-syncdb
  python manage.py createsuperuser
  python manage.py runserver

.. _GoToSite: https://goto.msk.ru/
