#!/usr/bin/env python

from opcua import ua, Client
import time
import pymysql
import threading
import sys

PROGRAM_NAME = "PLC1"
REFRESH_TIME = 500


# database port is 3306 by default
DATABASE_IP = "sldn296.piensasolutions.com"
DATABASE_USER = "qags707"
DATABASE_PASSWORD = "Eduard2793"
DATABASE_NAME = "qags707"
DATABASE_PORT = "3306"

WAREHOUSE = 0
DEVICE = 1
ID = 2
DESCRIPTION = 3
SEVERITY = 4
STATE = 5
K = 6


class SubHandler(object):

    def datachange_notification(self, node, val, data):
        # work with data in thread
        threading.Thread(target=self.sub_manager, args=[node]).start()

    ''' Thread to execute more complex tasks '''
    def sub_manager(self, node):
        database = DatabaseManager()
        db = database.connect()

        for i in node.get_children():
            alarm = i.get_children()

            if (not alarm[STATE].get_value() and not alarm[K].get_value()) or alarm[STATE].get_value():
                print("alarm for device", alarm[DEVICE].get_value())

                if database.exists(db, id_alarm=alarm[ID].get_value()):
                    if database.update_db(db, device=alarm[DEVICE].get_value(), id_alarm=alarm[ID].get_value(),
                                          severity=alarm[SEVERITY].get_value(), state=alarm[STATE].get_value(),
                                          description=alarm[DESCRIPTION].get_value()):
                        # write variable to plc only if it has been successfully updated in the database
                        alarm[K].set_value(ua.DataValue(ua.Variant([True], ua.VariantType.Boolean)))
                else:
                    if database.insert_db(db, device=alarm[DEVICE].get_value(), id_alarm=alarm[ID].get_value(),
                                          severity=alarm[SEVERITY].get_value(), state=alarm[STATE].get_value(),
                                          description=alarm[DESCRIPTION].get_value()):
                        # write variable to plc only if it has been successfully registered to the database
                        alarm[K].set_value(ua.DataValue(ua.Variant([True], ua.VariantType.Boolean)))

        database.disconnect(db)


class DatabaseManager(object):

    def connect(self):
        return pymysql.connect(host='sldn296.piensasolutions.com',
                             user='qags707',
                             password='Eduard2793',
                             database='qags707')

    def disconnect(self, db):
        db.close()

    def exists(self, db, id_alarm):
        cursor = db.cursor()
        cursor.execute("SELECT * FROM " + DATABASE_NAME + ".alarms WHERE id_alarm like '" + id_alarm.lstrip("0") + "'")

        data = cursor.fetchone()
        return data is not None

    def insert_db(self, db, device, id_alarm, severity, state, description):
        cursor = db.cursor()

        response = False
        try:
            # Execute the SQL command
            sql = "INSERT INTO " + DATABASE_NAME + ".alarms(device, id_alarm, severity, state, description, updated_at, created_at) " \
                                                   "VALUES('%s', %s, %d, %d, '%s', NOW(), NOW())" \
                  % (device, id_alarm, severity, state, description)
            cursor.execute(sql)

            # Commit the changes in the database
            db.commit()
            response = True

        except:
            # Rollback in case there is any error
            db.rollback()
            print("rollback")

        return response

    def update_db(self, db, device, id_alarm, severity, state, description):
        cursor = db.cursor()

        response = False
        try:
            # Execute the SQL command
            sql = "UPDATE " + DATABASE_NAME + ".alarms SET device='%s', severity=%d, state=%d, description='%s', updated_at=NOW() WHERE id_alarm LIKE '%s'" \
                  % (device, severity, state, description, id_alarm.lstrip("0"))
            cursor.execute(sql)

            # Commit the changes in the database
            db.commit()
            response = True

        except:
            # Rollback in case there is any error
            db.rollback()
            print("rollback")

        return response


if __name__ == "__main__":

    if len(sys.argv) != 2:
        print("Wrong invocation!\n")
        print("Usage: plc-client.py [ip]")
        print("Example: plc-client.py opc.tcp://localhost:4840/")
        sys.exit(1)

    url = sys.argv[1]
    client = Client(url)

    try:
        client.connect()

        root = client.get_root_node()

        # idx = client.get_namespace_array()
        # print(idx)
        print("Connected")
        uri = 'urn:BeckhoffAutomation:Ua:' + PROGRAM_NAME
        idx = client.get_namespace_index(uri)

        # get plc items
        obj = root.get_child(["0:Objects"])
        plc = obj.get_child([("{}:" + PROGRAM_NAME).format(idx)])
        opc_ua = plc.get_child(["{}:OPC_UA".format(idx)])
        alarms = opc_ua.get_child(["{}:Alrm".format(idx)])
        n = alarms.get_child(["{}:n".format(idx)])

        # subscript to variable changes
        handler = SubHandler()
        sub = client.create_subscription(REFRESH_TIME, handler)
        handle = sub.subscribe_data_change(n)

        while True:
            time.sleep(0.1)

        # sub.unsubscribe(handle)
        # sub.delete()

        # res = obj.call_method("{}:multiply".format(idx), 3, "klk")
        # print("method result is: ", res)

    finally:
        # close connection
        client.disconnect()
        print("Client disconnected.")
